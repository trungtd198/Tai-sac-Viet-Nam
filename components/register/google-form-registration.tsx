import { ArrowUpRight, CheckCircle2, Clock, FileText } from "lucide-react";
import { registrationFormUrl } from "@/lib/registration-config";

export function GoogleFormRegistration() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#c49b41]/25 bg-[#fbfaf6] shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
      <div className="grid gap-6 p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f7b2c]">
            Đăng ký chính thức
          </p>
          <h3 className="mt-3 text-2xl font-bold text-[#171104] md:text-3xl">
            Hoàn tất hồ sơ qua Google Form
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#5f5747]">
            Ban tổ chức tiếp nhận hồ sơ qua biểu mẫu Google Form. Vui lòng mở form, điền đầy đủ thông tin và gửi trước hạn đăng ký.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            {
              icon: FileText,
              title: "Chuẩn bị thông tin cá nhân",
              description: "Họ tên, liên hệ, khu vực sinh sống và phần giới thiệu ngắn."
            },
            {
              icon: CheckCircle2,
              title: "Gửi hồ sơ trên Google Form",
              description: "Dữ liệu đăng ký được ghi nhận trực tiếp qua biểu mẫu chính thức."
            },
            {
              icon: Clock,
              title: "Hạn đăng ký: 30/06/2026",
              description: "Ban tổ chức sẽ liên hệ xác nhận sau khi tiếp nhận hồ sơ phù hợp."
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex gap-3 rounded-xl border border-[#c49b41]/18 bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c49b41]/12 text-[#9f7b2c]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#171104]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#675f50]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <a
          href={registrationFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#b11f49] px-6 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#96183d] hover:shadow-[0_0_24px_rgba(177,31,73,0.24)]"
        >
          Mở Google Form đăng ký
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
