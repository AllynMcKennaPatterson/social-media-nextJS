//Not used currently

import classes from "./Bio.module.css";

function Bio() {
  return (
    <div className={classes.profileLeftBar}>
      <div className={classes.notificationsContainer}>
        {/* <img src={`${CoverImage}`} className="profileCoverImage" /> */}
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "-30px" }}
        >
          {/* <img src={`${ProfileImage}`} className="profilePageImage" /> */}
          <div>
            <p
              style={{
                marginLeft: "10px",
                marginTop: "25px",
                color: "black",
                textAlign: "start",
              }}
            >
              Allyn
            </p>
            <p
              style={{
                marginLeft: "10px",
                marginTop: "25px",
                color: "#aaa",
                textAlign: "start",
                marginTop: "-20px",
                fontSize: "12px",
              }}
            >
              Software Developer
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: "20px", fontSize: "14px" }}>
            Profile Views
          </p>
          <p style={{ color: "black", marginRight: "20px", fontSize: "14px" }}>
            4232
          </p>
        </div>
        <hr style={{ marginTop: "-10px", marginBottom: "-10px" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: "20px", fontSize: "14px" }}>
            Friends
          </p>
          <p style={{ color: "black", marginRight: "20px", fontSize: "14px" }}>
            180
          </p>
        </div>
        <hr
          style={{ marginTop: "-10px", marginBottom: "-10px", color: "#aaa" }}
        />
        <div>
          <h5
            style={{
              color: "black",
              fontSize: "14px",
              marginBottom: "5px",
              textAlign: "start",
              marginLeft: "20px",
            }}
          >
            User Bio
          </h5>
          <p
            style={{
              color: "black",
              marginRight: "20px",
              fontSize: "14px",
              textAlign: "start",
              marginLeft: "20px",
              marginTop: "0px",
            }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
        <button
          style={{
            width: "100%",
            paddingTop: "4px",
            paddingBottom: "4px",
            border: "none",
            backgroundColor: "#aaa",
          }}
        >
          Edit Bio
        </button>
      </div>
    </div>
  );
}

export default Bio;
