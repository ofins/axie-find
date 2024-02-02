const style = {
  fontFamily: "Roboto",
};

const AppTitle = (props) => {
  return (
    <div>
      <h1 className=" text-28px" style={style}>
        {props.title}
      </h1>
      <span>Last updated: {props.lastUpdated}</span>
      <hr />
    </div>
  );
};

export default AppTitle;
