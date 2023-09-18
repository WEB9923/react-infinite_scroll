import {JSX, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import Card from "./components/Card.tsx";
interface IPosts {
  userId?: number;
  id: number;
  title: string;
  body: string;
}
export default function App(): JSX.Element {
  const [data, setData] = useState<IPosts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=16&_page=${page}`);
      if(response) {
        setData((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleInfiniteScroll = async (): Promise<void> => {
    try {
      if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <div style={{
        width:"100%",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {isLoading && <p style={{
          position:"absolute",
          top:"0",
          left:"0",
          transform: "translate(-50%,-50%)",
          zIndex: 2,
          backgroundColor:"#949292",
          color:"#d23b3b"
        }}>loading...</p>}
        {data?.map((item) => (
          <Card key={item.id} {...item}/>
        ))}
      </div>
    </>
  )
}
