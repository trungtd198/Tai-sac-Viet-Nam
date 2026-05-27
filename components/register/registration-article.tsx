import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { defaultAssets } from "@/lib/default-assets";
import {
  registrationFormUrl,
  registrationPdfName,
  registrationPdfUrl,
} from "@/lib/registration-config";
import { socialLinks } from "@/lib/social-links";

const contactItems = [
  ["Facebook", socialLinks.facebook],
  ["Youtube", socialLinks.youtube],
  ["Email", socialLinks.email],
  ["Hotline 1", "tel:0345198135"],
  ["Hotline 2", "tel:0868842988"],
  ["Website", "https://taisacvietnam.vn/"],
];

export function RegistrationArticle() {
  return (
    <section className="registration-premium">
      <div className="registration-premium__glow" />
      <div className="registration-premium__grid" />

      <article className="registration-premium__article">
        <header className="registration-premium__header">
          <h1 className="registration-premium__title">
            Tuyển sinh toàn quốc cuộc thi Tài Sắc Việt Nam 2026
          </h1>
        </header>

        <div className="registration-premium__content">
          <p className="registration-premium__date">09/12/2024</p>

          <h2 className="registration-premium__subtitle">
            Việt Nam rạng ngời - Tài Sắc Việt Nam tỏa sáng. Cuộc thi Tài Sắc
            Việt Nam 2026 chính thức mở cổng tuyển sinh toàn quốc!
          </h2>

          <div className="registration-premium__hero-image">
            <Image
              src={defaultAssets.heroBanner}
              alt="Tài Sắc Việt Nam 2026 mở cổng tuyển sinh toàn quốc"
              fill
              priority
              sizes="(min-width: 768px) 900px, 100vw"
              className="registration-premium__image-cover"
            />
          </div>

          <div className="registration-premium__copy">
            <p>
              Bạn có từng mơ ước tỏa sáng trên sân khấu và trở thành biểu tượng
              nhan sắc - trí tuệ - bản lĩnh? Bạn muốn trở thành đại sứ lan tỏa
              hình ảnh người phụ nữ Việt Nam hiện đại đẹp về ngoại hình, sâu sắc
              về trí tuệ và giàu lòng nhân ái?
            </p>
            <p>
              Bạn tin vào giá trị của bản thân và khao khát chinh phục những
              đỉnh cao mới?
            </p>
            <p>
              Chúng tôi tự hào chào đón bạn, những cô gái tài sắc vẹn toàn trên
              khắp Việt Nam trong hành trình Tài Sắc Việt Nam 2026 - nơi tôn
              vinh vẻ đẹp toàn diện của người phụ nữ Việt, khẳng định bản lĩnh
              và lan tỏa những giá trị tốt đẹp đến cộng đồng.
            </p>
            <p>
              Hãy tham gia ngay để chạm tay vào chiếc vương miện danh giá nhất!
            </p>
          </div>

          <div className="registration-premium__action-card">
            <div>
              <p className="registration-premium__card-title">
                Đăng ký ngay tại:
              </p>
              <a
                href={registrationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="registration-premium__text-link"
              >
                {registrationFormUrl}
                <ArrowUpRight className="registration-premium__link-icon" />
              </a>
            </div>
            <a
              href={registrationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="registration-premium__button"
            >
              Mở form
            </a>
          </div>

          <div className="registration-premium__info-card">
            <p className="registration-premium__card-title">
              Tải đơn đăng ký dự thi:
            </p>
            <p className="registration-premium__card-text">
              Dành cho thí sinh muốn tải mẫu đơn, tự điền thông tin và chuẩn bị
              hồ sơ dự thi.
            </p>
            <a
              href={registrationPdfUrl}
              download={registrationPdfName}
              className="registration-premium__button registration-premium__button--download"
            >
              <Download className="registration-premium__button-icon" />
              Tải đơn PDF
            </a>
          </div>

          <div className="registration-premium__mockup">
            <Image
              src={defaultAssets.brandTexture}
              alt="Hình ảnh nhận diện Tài Sắc Việt Nam 2026"
              fill
              sizes="(min-width: 768px) 680px, 100vw"
              className="registration-premium__image-cover"
            />
          </div>

          <section className="registration-premium__contact">
            <h3 className="registration-premium__contact-title">
              Thông tin liên hệ:
            </h3>
            <ul className="registration-premium__contact-list">
              {contactItems.map(([label, value]) => (
                <li key={label}>
                  <span className="font-semibold">{label}: </span>
                  <a
                    href={label === "Email" ? `mailto:${value}` : value}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noopener noreferrer"}
                    className="registration-premium__contact-link"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </section>
  );
}
