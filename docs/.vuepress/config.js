import { defaultTheme } from 'vuepress'
import javascriptConfig from '../javascript/config';
import designPatternConfig from '../designPattern/config';

export default {
  lang: 'zh-CN',
  title: "JackLi's Blog",
  description: 'Constant dropping wears the stone.',
  theme: defaultTheme({
    logo: '/Blog.svg',
    repo: 'https://gitee.com/ljj6666666666666/blog-of-output-optimization.git',
    contributors: false,
    editLink: false,
    navbar: [
      // {
      //   text: '编码规范',
      //   link: '/standard/',
      // },
      {
        text: '设计模式',
        link: '/designPattern/',
      },
      {
        text: 'Javascript',
        link: '/javascript/'
      }
    ],
    sidebar: {
      '/designPattern/': [
        {
          children: [designPatternConfig],
        },
      ],
      '/javascript/': [
        {
          text: 'javascript',
          children: [...javascriptConfig.children],
        },
      ],
      '/standard/': [
        {
          text: 'standard',
          children: [
            // gitConfig, javascriptConfig, 
            {
              text: '命名规范/NamedConstraints',
              link: '/standard/namedconstraints'
            }, {
              text: '组件库开发规范',
              link: '/standard/componentlibrary'
            }]
        },
      ],
    },
  }),
}