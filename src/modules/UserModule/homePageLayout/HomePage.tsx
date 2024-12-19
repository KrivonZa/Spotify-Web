import { Card } from "antd";
import "./homepage.css";
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
                className="items-artists"
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
      <div className="artists">{renderArtists()}</div>
      {/* <div className='list-friend fixed bottom-5 right-10'>
                <ListFriend />
            </div> */}

      <div>
        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc
        họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob
        Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở
        vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và
        Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt,
        với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305
        g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu
        lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu
        xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim
        trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non
        có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [
        Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]


        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]


        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]

        Reinwardtoena reinwardti là danh pháp khoa học của một loài chim thuộc họ Bồ câu (Columbidae) do nhà động vật học người Hà Lan Coenraad Jacob Temminck lần đầu mô tả vào năm 1824. Đây là loài sinh sống chủ yếu ở vùng rừng nguyên sinh, bìa rừng tại New Guinea, các hòn đảo lân cận và Wallacea. Reinwardtoena reinwardti có ngoại hình lớn và dễ phân biệt, với chiều dài rơi vào khoảng 47,5–52,5 cm và cân nặng đạt khoảng 208–305 g. Ở giai đoạn trưởng thành, chim có đầu, cổ và ngực màu trắng hoặc màu lam xám, cùng bộ cánh rìa ngoài màu đen. Phần thân dưới của chim có màu xám xanh nhạt, còn phần trên thì màu nâu hạt dẻ. Chim mái khác chim trống ở đặc điểm là mống mắt vàng hơn và mép viền mắt tối hơn. Chim non có bộ lông màu nâu xám đậm, với phần cổ và phần bụng màu trắng đục. [ Đọc tiếp ]
      </div>
    </section>
  );
}
