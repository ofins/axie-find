const style = {
  fontFamily: "Roboto",
};

const AppTitle = (props) => {
  return (
    <div>
      <div className="text-28px text-center fw-700" style={style}>
        {props.title}
      </div>
      <span className="text-sm">
        Last updated: <i>{props.lastUpdated}</i>
      </span>
      <hr />
    </div>
  );
};

export default AppTitle;
