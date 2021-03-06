import Info from "./Info";

function InfoList(props) {

  return(<div>
    {props.infos.map(info=> (
      <Info 
      key={info.id}
      header={info.header}
      text={info.text}
      img={info.img}
      location={info.location}/>
    ))}
  </div>); 
}

export default InfoList;