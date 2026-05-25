export type ScheduleEvent = {
  time: string;
  title: string;
  description: string;
};

export type ScheduleDay = {
  date: string;
  label: string;
  events: ScheduleEvent[];
};

export const scheduleDays: ScheduleDay[] = [
  {
    date: "2026-08-20",
    label: "Giai đoạn tuyển sinh",
    events: [
      {
        time: "09:00",
        title: "Mở đơn toàn quốc",
        description: "Tiếp nhận hồ sơ thí sinh nữ công dân Việt Nam trong độ tuổi từ 18 đến 28."
      },
      {
        time: "10:30",
        title: "Hướng dẫn hồ sơ",
        description: "Công bố tiêu chí, thông tin cần chuẩn bị và kênh liên hệ xác nhận."
      },
      {
        time: "14:00",
        title: "Xét duyệt ban đầu",
        description: "Ban tổ chức rà soát thông tin và liên hệ các hồ sơ phù hợp."
      }
    ]
  },
  {
    date: "2026-08-21",
    label: "Giai đoạn đào tạo",
    events: [
      {
        time: "08:30",
        title: "Tinh hoa cổ phục",
        description: "Thí sinh trải nghiệm quốc phục, hình ảnh truyền thống và câu chuyện văn hóa dân tộc."
      },
      {
        time: "13:30",
        title: "Giá trị làng nghề",
        description: "Ghi hình tại không gian làng nghề, văn hóa phi vật thể và hoạt động trải nghiệm thực tế."
      },
      {
        time: "18:00",
        title: "Thử thách bản lĩnh",
        description: "Rèn luyện ứng xử truyền thống, tư duy hiện đại, giao tiếp và truyền cảm hứng."
      }
    ]
  },
  {
    date: "2026-08-22",
    label: "Gala Chung kết",
    events: [
      {
        time: "15:00",
        title: "Tổng duyệt",
        description: "Tổng duyệt sân khấu, kiểm tra kỹ thuật và thống nhất vận hành đêm vinh danh."
      },
      {
        time: "18:30",
        title: "Thảm đỏ",
        description: "Đón khách, báo chí, đối tác và ghi nhận khoảnh khắc trước chương trình."
      },
      {
        time: "19:30",
        title: "Vinh danh",
        description: "Chương trình sân khấu chính, phần thể hiện của thí sinh, biểu diễn và công bố danh hiệu."
      }
    ]
  }
];

export function formatScheduleDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
