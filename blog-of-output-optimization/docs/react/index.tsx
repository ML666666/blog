import axiox from "axios";
import { useEffect, useMemo, useState } from "react";
import { Rating } from "react-simple-start-rating";

interface productType {
    id: number,
    image: string,
    name: string,
    des: string,
    price: number,
    rate: number
}

/**
 * dome描述：从服务器获取一组商品信息，并按照不同评分，展示不同评分的商品
 * 这是目前的代码，所有逻辑和状态冗余到一块了，不好理解与维护
 */

export function Dome() {
  const [products, setProduct] = useState<productType[]>([]);
  const [filterRate, setFilterRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axiox.get("https://xxxx");
    if (response && response.data && response.status === 200) {
      setProduct(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRating = (rate: number) => {
    setFilterRate(rate);
  };

  const filteredProducts = useMemo(
    () => products.filter((product: productType) => product.rate > filterRate),
    [products, filterRate]
  );

  return (
    <div>
      <div>
        <Rating initiaValue={filterRate} onClick={handleRating}></Rating>
      </div>
      {loading ? (
        <div>
          {filteredProducts.map((product: productType) => (
            <div key={product.id}>
              <image src={product.image}></image>
              <div>name:{product.name}</div>
              <div>des:{product.des}</div>
              <div>price:{product.price}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
