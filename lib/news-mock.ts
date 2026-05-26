export type NewsPost = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  excerpt: string;
  content: Array<{
    type: "paragraph" | "heading";
    text: string;
  }>;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "tai-sac-viet-nam-2026-tuyen-sinh",
    title: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh",
    thumbnail:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-05-26",
    excerpt: "Ban tổ chức chính thức mở đơn tuyển sinh toàn quốc cho hành trình đi tìm vẻ đẹp giao thoa giữa truyền thống và hiện đại.",
    content: [
      {
        type: "paragraph",
        text: "Tài Sắc Việt Nam 2026 là chương trình truyền hình thực tế kết hợp giải trí hiện đại và chiều sâu văn hóa di sản."
      },
      {
        type: "heading",
        text: "Hành trình dành cho phụ nữ Việt Nam thế hệ mới"
      },
      {
        type: "paragraph",
        text: "Chương trình tìm kiếm những gương mặt có bản lĩnh, trí tuệ, tình yêu văn hóa dân tộc và khát vọng truyền cảm hứng cho cộng đồng."
      }
    ]
  },
  {
    slug: "hanh-trinh-van-hoa-truyen-hinh-thuc-te",
    title: "Hành trình văn hóa trong 06 tập truyền hình thực tế",
    thumbnail:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-06-03",
    excerpt: "Thí sinh sẽ trải nghiệm cổ phục, làng nghề, thử thách ứng xử và các không gian văn hóa đặc trưng.",
    content: [
      {
        type: "paragraph",
        text: "Chương trình được thiết kế để đưa thí sinh trực tiếp dấn thân vào các không gian văn hóa, từ cổ phục đến làng nghề truyền thống."
      },
      {
        type: "heading",
        text: "Khán giả có thể mong đợi gì"
      },
      {
        type: "paragraph",
        text: "Khán giả sẽ theo dõi hành trình rèn luyện, thử thách bản lĩnh cá nhân, kỹ năng giao tiếp và khả năng lan tỏa giá trị Việt."
      }
    ]
  },
  {
    slug: "gala-chung-ket-vinh-danh",
    title: "Điểm nhấn Gala Chung kết vinh danh",
    thumbnail:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-06-18",
    excerpt: "Gala Chung kết là đêm vinh danh những gương mặt nổi bật về bản lĩnh, trí tuệ và giá trị nhân văn.",
    content: [
      {
        type: "paragraph",
        text: "Gala Chung kết kết hợp trình diễn, ứng xử, biểu diễn văn hóa và công bố danh hiệu trong một chương trình sân khấu chỉn chu."
      },
      {
        type: "heading",
        text: "Danh hiệu và giá trị nhận được"
      },
      {
        type: "paragraph",
        text: "Thí sinh có cơ hội tỏa sáng, được quảng bá hình ảnh trên truyền hình, báo chí, mạng xã hội và chạm tới các cơ hội đồng hành chuyên nghiệp."
      }
    ]
  }
];

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

export function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
