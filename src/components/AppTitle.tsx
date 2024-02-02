const style = {
  fontFamily: "Roboto",
};

const AppTitle = (props) => {
  return (
    <div>
      <h1 className="text-28px text-center" style={style}>
        {props.title}
      </h1>
      <span className="text-sm">
        Last updated: <i>{props.lastUpdated}</i>
      </span>
      <hr />
    </div>
  );
};

export default AppTitle;
