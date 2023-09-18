import {JSX} from "react";
import style from "./Card.module.scss";

export default function Card(props : {userId: number; id: number; title: string; body: string}): JSX.Element {
  return (
    <>
      <div className={style.card}>
        <div className={style.id}>
          {props.id}
        </div>
        <div className={style.content}>
          <div className={style.title}>
            {props.title}
          </div>
          <div className={style.body}>
            {props.body}
          </div>
        </div>
      </div>
    </>
  );
}
