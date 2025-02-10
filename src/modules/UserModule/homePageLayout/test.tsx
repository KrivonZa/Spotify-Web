// import { Card } from "antd";
// import { useEffect, useState } from "react";
// import { apiGetUser } from "../../../apis/apiGetUser";
// import { TypeUser } from "../../../types/typeUser";
// import { Link } from "react-router-dom";
// import { useExtractColors } from "react-extract-colors";

// const image = "http://localhost:3000/api/image/nick.jpg";

// const { Meta } = Card;

// export default function HomePage() {
//   const [user, setUser] = useState<TypeUser[]>([]);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);

//   const callApiGetUser = async () => {
//     const result = await apiGetUser();
//     setUser(Array.isArray(result) ? result : [result]);
//   };

//   useEffect(() => {
//     callApiGetUser();
//   }, []);

//   const { dominantColor, darkerColor, lighterColor } = useExtractColors(image);

//   const bgDominantColor = dominantColor || "";
//   const bgDarkerColor = darkerColor || "";
//   const bgLighterColor = lighterColor || "";

//   const renderArtists = () => {
//     if (user) {
//       return user.map((itemUser) => {
//         if (itemUser.role === "Singer") {
//           return (
//             <Link
//               key={itemUser.userId}
//               to={`/detail-artists/${itemUser.userId}`}
//             >
//               <Card
//                 className=""
//                 hoverable
//                 style={{ width: 200 }}
//                 cover={
//                   <img
//                     className="img-artists"
//                     alt="example"
//                     src={itemUser.avatar}
//                   />
//                 }
//               >
//                 <Meta title={itemUser.name} description={itemUser.role} />
//               </Card>
//             </Link>
//           );
//         }
//       });
//     }
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   console.log(uploadedImage)

//   return (
//     <section
//       style={{
//         background: `linear-gradient(to bottom, ${bgLighterColor} 10px, ${bgDominantColor} 10%, ${bgDarkerColor} 20%, #121212 70%)`,
//       }}
//       className="min-h-screen"
//     >
//       <div className="tittle pt-9 pl-5">
//         <a className="text-xl font-bold">Dành cho MÀY</a>
//       </div>
//       <img
//         src={uploadedImage || "https://image-media.trangiangkhanh.site/nick.jpg"}
//         alt="Uploaded"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <input
//         type="file"
//         id="img"
//         name="img"
//         accept="image/*"
//         onChange={handleImageUpload}
//       />
//       <input type="submit" />
//     </section>
//   );
// }
