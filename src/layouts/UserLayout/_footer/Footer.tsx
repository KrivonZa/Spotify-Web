import { Row, Col } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="text-white p-4">
      <div className="container mx-auto">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">{t("footer.company")}</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.about")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.job")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.record")}
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">{t("footer.communities")}</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.artist")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.developers")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.ads")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.investor")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.vendor")}
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">{t("footer.link")}</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.support")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.app")}
                </button>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} className="text-base">
            <h4 className="font-bold mb-2">{t("footer.plans")}</h4>
            <ul className="space-y-1 text-[#a0a0a0]">
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.individual")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.student")}
                </button>
              </li>
              <li>
                <button className="hover:text-white hover:underline duration-150">
                  {t("footer.free")}
                </button>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="flex justify-center mt-10">
          <a
            href="#"
            className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3"
          >
            <InstagramOutlined style={{ fontSize: 24 }} />
          </a>
          <a
            href="#"
            className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3"
          >
            <TwitterOutlined style={{ fontSize: 24 }} />
          </a>
          <a
            href="#"
            className="mr-4 hover:bg-[#414141] duration-200 rounded-full px-3 py-3"
          >
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
