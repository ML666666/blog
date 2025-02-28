# tortoise

tortoise 是一个基于 Python 的轻量级 ORM 框架，它的设计目标是提供一个简单易用的方式来操作数据库。

我的新项目用的是 fastapi，所以我选择了 tortoise 作为我的 orm 框架。

以下，主要是记录我在使用 tortoise 的过程中，编写的一些样板代码，用作记录，方便以后再次开启新项目时，快速搭建项目。

## 安装

前置工作

```bash
pipenv shell # 进入虚拟环境
pipenv install fastapi uvicorn # 安装 fastapi 和 uvicorn
```

然后安装 tortoise 和 aerich

```bash
pipenv install tortoise-orm aerich
```

ps: aerich 是 tortoise 的迁移工具，用于管理数据库的迁移。

要使用 tortoise，需要先定义一个模型，然后使用 tortoise 来操作数据库。

## 定义模型

```python
from tortoise import fields, models


class User(models.Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=20, unique=True)
    password = fields.CharField(max_length=128)
    email = fields.CharField(max_length=50

# 路径为项目根目录下的 models.py
```

第二步，使用 准备好 相关的数据库配置

```python
db_config = {
    'connections': {
        'default': {
            'engine': 'tortoise.backends.mysql',
            'credentials': {
                'host': '127.x.x.x', # 数据库地址
                'port': '3307', # 数据库端口
                'user': 'your username', # 数据库用户名
                'password': 'your password',# 数据库密码
                'database': 'the database name you want to connect', # 数据库名称
                'charset': 'utf8mb4',  # 可选，指定字符集
                "maxsize": 50, # 可选，指定连接池大小
                "minsize": 10, # 可选，指定连接池最小大小
                "echo": True, # 可选，是否打印 SQL 语句
            },
        },
    },
    "apps": {
        "models": {
            "models": ["models", "aerich.models"], # 模型所在的模块路径 models 为项目根目录下的 models.py aerich.models 为 tortoise 的迁移工具
            "default_connection": "default", # 默认连接
            'generate_schemas': True,  # 自动生成数据库表
            'add_exception_handlers': True,  # 添加异常处理
        }
    },
    "use_tz": False,
    "timezone": "Asia/Shanghai", # 设置时区为上海
}
# 路径为项目根目录下的 settings.py
```

接下来，编写 fastApi 项目的样板代码

```python
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise # 导入 tortoise 的 fastapi 插件
from settings import db_config # 导入数据库配置
app = FastAPI()

register_tortoise(
    app,
    config=db_config,
    generate_schemas=True,  # 自动生成数据库表 这个建议直接设置为FALSE，然后使用迁移工具中生成数据库表
    add_exception_handlers=True,  # 添加异常处理
)
```

再接下来，我们就将环境大致都准备好了，但这个时候，我们还没有真正的去操作数据库，我们只是定义了模型，模型这时还没有真正的去创建数据库表。

这时我们需要运行以下命令，来生成数据库表

```bash
# 初始化迁移工具
pipenv run aerich init -t setting.db_config
```

ps：如果运行这个命令后报错，你可以运行 `pipenv install tomli_w` 来安装 tomli_w 库，然后再运行这个命令。

如果一切顺利，你会看到以下输出

```bash
Success creating migrations folder ./migrations
Success writing aerich config to pyproject.toml
```

以上两个输出说明，迁移工具已经初始化成功，初始化表语句也已经生成。

接下来，我们需要运行以下命令，来生成数据库表

```bash
# 初始化数据库表，这个命令会自动生成数据库表
pipenv run aerich init-db

```

这条名字之后，你会看到以下输出，并且可以在数据库中看到对应的表已经生成

```bash
Success creating app migration folder migrations\models
```

并在 migrations\models 文件下，看到\_None.py 结尾的文件，如：2_20250228145532_None.py

里面放置的，就是本次初始化时的建表语句

之后，如果你需要修改模型，你需要运行以下命令，来生成数据库表

```bash
# 生成数据库表，这个命令会自动生成数据库表
pipenv run aerich migrate

```

运行这个命令后，你能看到
migrations/models 下会有一个新的签约问题，这个文件格式大致如下

```python
# 4_20250228151040_update.py
from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `word_detail` MODIFY COLUMN `pronunciation` VARCHAR(255)NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `word_detail` MODIFY COLUMN `pronunciation` VARCHAR(100)NOT NULL;"""
```

这时，你只需要运行

```bash
# 生成数据库表，这个命令会自动更新数据库表
pipenv run aerich upgrade
```

与之相反

```bash
# 生成数据库表，这个命令会自动回退刚刚你的更新操作
pipenv run aerich downgrade
```
