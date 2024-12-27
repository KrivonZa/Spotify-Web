import { Card } from "antd";
import { useEffect, useState } from "react";
import { apiGetUser } from "../../../apis/apiGetUser";
import { TypeUser } from "../../../types/typeUser";
import { Link } from "react-router-dom";
import { useExtractColors } from "react-extract-colors";

const image = "https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg";

const { Meta } = Card;
export default function HomePage() {
  const [user, setUser] = useState<TypeUser[]>([]);
  const callApiGetUser = async () => {
    const result = await apiGetUser();
    setUser(Array.isArray(result) ? result : [result]);
  };
  useEffect(() => {
    callApiGetUser();
  }, []);

  const { dominantColor, darkerColor, lighterColor } = useExtractColors(image);

  const bgDominantColor = dominantColor || "";
  const bgDarkerColor = darkerColor || "";
  const bgLighterColor = lighterColor || "";

  const renderArtists = () => {
    if (user) {
      return user.map((itemUser) => {
        if (itemUser.role === "Singer") {
          return (
            <Link
              key={itemUser.userId}
              to={`/detail-artists/${itemUser.userId}`}
            >
              <Card
                className=""
                hoverable
                style={{ width: 200 }}
                cover={
                  <img
                    className="img-artists"
                    alt="example"
                    src={itemUser.avatar}
                  />
                }
              >
                <Meta title={itemUser.name} description={itemUser.role} />
              </Card>
            </Link>
          );
        }
      });
    }
  };
  console.log(bgDominantColor)
  return (
    <section
      style={{
        background: `linear-gradient(45deg, ${bgDominantColor}, ${bgDarkerColor}, ${bgLighterColor})`,
      }}
    >
      <div className="tittle pt-9 pl-5">
        <a className="text-xl font-bold">Dành cho MÀY</a>
      </div>
      <img src="https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg" />
    </section>
  );
}

{
  /* <div className="artists">{renderArtists()}</div> */
}
{
  /* <div className='list-friend fixed bottom-5 right-10'>
                <ListFriend />
            </div> */
}
