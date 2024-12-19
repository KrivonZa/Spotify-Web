import { Row, Col } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="text-white p-4">
      <div className="container mx-auto">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">Công ty</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Giới thiệu
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Việc làm
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  For the Record
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">Cộng đồng</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Dành cho các Nghệ sĩ
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Nhà phát triển
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Quảng cáo
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Nhà đầu tư
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Nhà cung cấp
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">Liên kết hữu ích</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Hỗ trợ
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Ứng dụng Di động Miễn phí
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">Các gói của Spotify</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Premium Individual
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Premium Student
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  Spotify Free
                </button>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="flex justify-center mt-10">
          <a href="#" className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3">
            <InstagramOutlined style={{ fontSize: 24 }} />
          </a>
          <a href="#" className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3">
            <TwitterOutlined style={{ fontSize: 24 }} />
          </a>
          <a href="#" className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3">
            <FacebookOutlined style={{ fontSize: 24 }} />
          </a>
        </div>
        <div className="flex border border-[#414141] my-3"></div>
        <p className="mt-4 text-[#a0a0a0]">© 2024 Spotify AB</p>
      </div>
    </footer>
  );
};

export default Footer;
