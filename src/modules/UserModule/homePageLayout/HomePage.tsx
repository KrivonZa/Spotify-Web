import { Card } from "antd";
import { useEffect, useState } from "react";
import { apiGetUser } from "../../../apis/apiGetUser";
import { TypeUser } from "../../../types/typeUser";
import { Link } from "react-router-dom";

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
  return (
    <section className="">
      <div className="tittle pt-9 pl-5">
        <a className="text-xl font-bold">Dành cho MÀY</a>
      </div>
      {/* <div className="artists">{renderArtists()}</div> */}
      {/* <div className='list-friend fixed bottom-5 right-10'>
                <ListFriend />
            </div> */}

      
    </section>
  );
}
