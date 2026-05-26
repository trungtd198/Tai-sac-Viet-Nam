import {
  programBrand,
  programEligibilityItems,
  programExperienceItems,
  programFormatItems,
  programHero,
  programOverviewBody,
  programSignificanceBody,
  programValueItems,
} from "../lib/program-copy";

export const homeBlocks = [
  {
    id: "home-hero",
    type: "hero",
    eyebrow: programHero.eyebrow,
    title: programHero.title,
    subtitle: programHero.subtitle,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
    primaryCta: { label: "Đăng ký ngay", href: "/dang-ky-du-thi" },
    secondaryCta: { label: "Sơ lược chương trình", href: "/about" },
  },
  {
    id: "home-stats",
    type: "stats",
    items: [
      { value: "06", label: "Tập truyền hình thực tế" },
      { value: "18-28", label: "Độ tuổi dự thi" },
      { value: "2026", label: "Tuyển sinh toàn quốc" },
    ],
  },
  {
    id: "home-about",
    type: "richText",
    eyebrow: "Về chương trình",
    title: "Sơ lược chương trình",
    body: programOverviewBody,
  },
  {
    id: "home-features",
    type: "featureGrid",
    eyebrow: "Trải nghiệm",
    title: "Không gian văn hóa đặc trưng",
    items: programExperienceItems,
  },
  {
    id: "home-values",
    type: "featureGrid",
    eyebrow: "Giá trị nhận được",
    title: "Ý nghĩa và quyền lợi nổi bật",
    items: programValueItems,
  },
  {
    id: "home-eligibility",
    type: "featureGrid",
    eyebrow: "Đối tượng dự thi",
    title: "Ai có thể tham gia?",
    items: programEligibilityItems,
  },
  {
    id: "home-news",
    type: "newsList",
    eyebrow: "Mới nhất",
    title: "Tin tức và thông báo",
    limit: 3,
  },
  {
    id: "home-sponsors",
    type: "sponsors",
    eyebrow: "Đối tác",
    title: "Đồng hành cùng các đối tác uy tín",
    sponsors: [
      "Đơn vị truyền thông",
      "Đối tác văn hóa",
      "Đối tác làng nghề",
      "Đối tác đào tạo",
    ],
  },
  {
    id: "home-cta",
    type: "cta",
    title: "Sẵn sàng trở thành gương mặt Tài Sắc Việt Nam?",
    body: "Gửi hồ sơ để ban tổ chức tiếp nhận, xét duyệt và liên hệ trong giai đoạn tuyển sinh toàn quốc.",
    cta: { label: "Bắt đầu đăng ký", href: "/dang-ky-du-thi" },
  },
];

export const aboutBlocks = [
  {
    id: "about-significance",
    type: "richText",
    eyebrow: "Ý nghĩa chương trình",
    title: `Về ${programBrand.name}`,
    body: programSignificanceBody,
  },
  {
    id: "about-overview",
    type: "richText",
    eyebrow: "Sơ lược",
    title: "Chương trình truyền hình thực tế",
    body: programOverviewBody,
  },
  {
    id: "about-values",
    type: "featureGrid",
    title: "Đối tượng dự thi",
    items: programEligibilityItems,
  },
];

export const scheduleBlocks = [
  {
    id: "schedule-hero",
    type: "richText",
    eyebrow: "Lịch trình",
    title: "Các mốc chương trình",
    body: "Timeline chính thức sẽ được cập nhật theo từng giai đoạn tuyển sinh, đào tạo, ghi hình truyền hình thực tế và Gala Chung kết.",
  },
  {
    id: "schedule-list",
    type: "schedule",
    items: programFormatItems.map((item, index) => ({
      date: [
        "26/05/2026 - 25/06/2026",
        "Giai đoạn 2",
        "Giai đoạn 3",
        "Ghi hình",
        "Dự kiến 2026",
        "Dự kiến 2026",
      ][index] || `Giai đoạn ${index + 1}`,
      title: item.title,
      description: item.description,
    })),
  },
];

export const registrationBlocks = [
  {
    id: "register-form",
    type: "registration",
    title: "Tuyển sinh toàn quốc cuộc thi Tài Sắc Việt Nam 2026",
  },
];

export const directRegistrationBlocks = [
  {
    id: "direct-register-form",
    type: "registration",
    title: "Tuyển sinh toàn quốc cuộc thi Tài Sắc Việt Nam 2026",
  },
];

export const onlineRegistrationBlocks = [
  {
    id: "online-register-form",
    type: "registration",
    title: "Tuyển sinh toàn quốc cuộc thi Tài Sắc Việt Nam 2026",
  },
];

export const vietnamTourismQueenBlocks = [
  {
    id: "season-hero",
    type: "hero",
    eyebrow: programHero.eyebrow,
    title: programBrand.name,
    subtitle: programHero.subtitle,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
    primaryCta: { label: "Đăng ký dự thi", href: "/dang-ky-du-thi" },
    secondaryCta: { label: "Xem lịch thi", href: "/lich-thi" },
  },
  {
    id: "season-stats",
    type: "stats",
    items: [
      { value: "2026", label: "Mùa tuyển sinh" },
      { value: "06", label: "Tập phát sóng" },
      { value: "18-28", label: "Độ tuổi dự thi" },
    ],
  },
  {
    id: "season-links",
    type: "featureGrid",
    eyebrow: "Thông tin cuộc thi",
    title: "Các mục nội dung chính",
    items: [
      {
        title: "Về chương trình",
        description:
          "Sơ lược hành trình truyền hình thực tế kết hợp văn hóa di sản và giải trí hiện đại.",
      },
      {
        title: "Đối tượng dự thi",
        description:
          "Nữ công dân Việt Nam từ 18 đến 28 tuổi, có tài năng, trí tuệ và khát vọng truyền cảm hứng.",
      },
      {
        title: "Thể lệ và lịch thi",
        description:
          "Công bố điều kiện tham gia, mốc thời gian tuyển sinh, đào tạo, ghi hình và Gala Chung kết.",
      },
    ],
  },
];

export const organizerBlocks = [
  {
    id: "organizer",
    type: "richText",
    eyebrow: "Đơn vị tổ chức",
    title: `Đơn vị tổ chức ${programBrand.name}`,
    body: `Đơn vị tổ chức ${programBrand.name} là tập thể những người làm nghề sáng tạo, truyền thông và văn hóa với tâm huyết gìn giữ và lan tỏa bản sắc Việt Nam. Chúng tôi cam kết vận hành chương trình minh bạch, chuyên nghiệp và mang lại trải nghiệm ý nghĩa cho mọi thí sinh, đối tác và khán giả.`,
  },
  {
    id: "organizer-focus",
    type: "featureGrid",
    title: "Vai trò vận hành",
    items: [
      {
        title: "Tổ chức sự kiện",
        description:
          "Quản lý lịch trình, sân khấu, hậu cần và trải nghiệm thí sinh.",
      },
      {
        title: "Truyền thông",
        description:
          "Phát triển nội dung, tin tức, video, ảnh và các hoạt động báo chí.",
      },
      {
        title: "Đối tác",
        description:
          "Kết nối nhà tài trợ, không gian văn hóa, làng nghề, đơn vị đào tạo và thương hiệu đồng hành.",
      },
    ],
  },
];

export const judgesBlocks = [
  {
    id: "judges-intro",
    type: "richText",
    eyebrow: "Ban giám khảo",
    title: "Hội đồng giám khảo",
    body: `Hội đồng giám khảo ${programBrand.name} gồm các chuyên gia hàng đầu trong lĩnh vực văn hóa, nghệ thuật, truyền thông và phát triển nhân tài. Danh sách giám khảo chính thức sẽ được ban tổ chức công bố theo từng giai đoạn của chương trình.`,
  },
  {
    id: "judges-grid",
    type: "featureGrid",
    title: "Tiêu chí đánh giá",
    items: [
      {
        title: "Bản lĩnh và phong thái",
        description:
          "Đánh giá sự tự tin, thần thái sân khấu, khả năng giao tiếp và trình diễn.",
      },
      {
        title: "Tri thức văn hóa",
        description:
          "Khả năng hiểu, kể và lan tỏa giá trị văn hóa truyền thống Việt Nam.",
      },
      {
        title: "Truyền cảm hứng",
        description:
          "Tiềm năng trở thành đại diện tích cực cho cộng đồng và thế hệ trẻ.",
      },
    ],
  },
];

export const rulesBlocks = [
  {
    id: "rules",
    type: "richText",
    eyebrow: "Thể lệ",
    title: "Thể lệ dự thi",
    body: `Thể lệ ${programBrand.name} được xây dựng nhằm đảm bảo sự công bằng, minh bạch và chuyên nghiệp trong suốt hành trình tuyển sinh. Mọi thí sinh đều được đối xử bình đẳng và có cơ hội thể hiện tài năng, bản lĩnh của mình trên mọi sân khấu của chương trình.`,
  },
  {
    id: "rules-items",
    type: "featureGrid",
    title: "Nội dung thể lệ",
    items: [
      {
        title: "Điều kiện tham gia",
        description: "Thông tin cá nhân, độ tuổi, hồ sơ và yêu cầu xác minh.",
      },
      {
        title: "Quy trình xét chọn",
        description:
          "Tiếp nhận hồ sơ, sơ khảo, truyền hình thực tế và chung kết.",
      },
      {
        title: "Quy định truyền thông",
        description:
          "Hướng dẫn sử dụng hình ảnh, phát ngôn và tài sản truyền thông.",
      },
    ],
  },
];

export const examScheduleBlocks = [
  {
    id: "exam-schedule-intro",
    type: "richText",
    eyebrow: "Lịch thi",
    title: `Lịch thi ${programBrand.name}`,
    body: "Các mốc lịch thi chính thức được trình bày theo từng giai đoạn để thí sinh, truyền thông và đối tác dễ theo dõi.",
  },
  {
    id: "exam-schedule-list",
    type: "schedule",
    items: [
      {
        date: "26/05/2026 - 25/06/2026",
        title: "CASTING — Tuyển sinh toàn quốc",
        description:
          "Thời gian đăng ký dự thi: từ ngày 26/05/2026 đến hết ngày 25/06/2026. Địa điểm: Toàn quốc. Thí sinh nộp hồ sơ trực tiếp hoặc qua cổng đăng ký online.",
      },
      {
        date: "Tháng 6/2026",
        title: "SƠ KHẢO — Hà Nội",
        description:
          "Địa điểm: Hà Nội. Nội dung: Trình diễn catwalk theo nhạc & thi tài năng. Ban giám khảo chọn 60 thí sinh vào vòng Bán Kết. Lưu ý: Trang phục và trang điểm thí sinh tự chuẩn bị; thí sinh tự túc chi phí ăn uống và đi lại.",
      },
      {
        date: "Tháng 7–8/2026",
        title: "BÁN KẾT — Hà Nội (dự kiến)",
        description:
          "Địa điểm (dự kiến): Hà Nội\nNội dung thi: Lựa chọn 30 thí sinh có điểm cao nhất có mặt trong đêm Chung kết.\n+ Catwalk\n+ Phần thi tài năng",
      },
      {
        date: "Dự kiến 2026",
        title: "CHUNG KẾT",
        description:
          "Nội dung thi: 30 thí sinh sẽ cùng có mặt trong đêm Chung kết, lần lượt tham gia các phần sau:\n+ Trình diễn trang phục áo dài\n+ Trình diễn trang phục dạ hội\n+ Phần thi tài năng\n+ Top 5 - Phần thi ứng xử\nCông bố và trao giải thưởng cho các danh hiệu: Quán quân, Quán quân 1, Quán quân 2 và các giải phụ.",
      },
    ],
  },
];

export const awardsPageBlocks = [
  {
    id: "awards-intro",
    type: "richText",
    eyebrow: "Giải thưởng",
    title: "Cơ cấu giải thưởng",
    body: `Những danh hiệu của ${programBrand.name} không chỉ là phần thưởng vật chất — đó là sự ghi nhận xứng đáng cho những cô gái dám bước ra, dám tỏa sáng và dám mang văn hóa Việt Nam đến với thế giới. Cơ cấu giải thưởng sẽ được ban tổ chức công bố chính thức trước đêm Gala Chung kết.`,
  },
  {
    id: "awards-grid",
    type: "featureGrid",
    title: "Danh hiệu nổi bật",
    items: [
      {
        title: "Tài Sắc Việt Nam",
        description:
          "Danh hiệu cao nhất dành cho gương mặt hội tụ bản lĩnh, trí tuệ và khả năng lan tỏa văn hóa.",
      },
      {
        title: "Danh hiệu đồng hành",
        description:
          "Các danh hiệu ghi nhận phong thái, tài năng và giá trị truyền cảm hứng.",
      },
      {
        title: "Giải chuyên đề",
        description:
          "Cổ phục, làng nghề, ứng xử, truyền thông và các hạng mục văn hóa chuyên sâu.",
      },
    ],
  },
];

export const faqBlocks = [
  {
    id: "faq-intro",
    type: "richText",
    eyebrow: "Giải đáp thắc mắc",
    title: "Các câu hỏi thường gặp",
    body: `Ban tổ chức ${programBrand.name} luôn sẵn sàng hỗ trợ thí sinh, gia đình và các đơn vị đồng hành. Dưới đây là những thông tin được hỏi nhiều nhất — nếu bạn cần thêm hỗ trợ, hãy liên hệ trực tiếp với chúng tôi qua các kênh chính thức.`,
  },
  {
    id: "faq-list",
    type: "featureGrid",
    title: "Chủ đề hỗ trợ",
    items: [
      {
        title: "Đăng ký",
        description: "Hướng dẫn gửi hồ sơ trực tiếp hoặc online.",
      },
      {
        title: "Lịch trình",
        description: "Thông tin về sơ khảo, truyền hình thực tế và chung kết.",
      },
      {
        title: "Liên hệ",
        description:
          "Kênh tiếp nhận câu hỏi từ thí sinh, báo chí và nhà tài trợ.",
      },
    ],
  },
];

export const timelineBlocks = [
  {
    id: "timeline-intro",
    type: "richText",
    eyebrow: "Lịch trình",
    title: "Lịch trình mùa thi",
    body: "Tổng hợp các giai đoạn chính của mùa thi — từ tuyển sinh, sơ khảo, truyền hình thực tế đến đêm Gala Chung kết.",
  },
  {
    id: "timeline-list",
    type: "schedule",
    items: [
      {
        date: "26/05/2026 - 25/06/2026",
        title: "CASTING — Tuyển sinh toàn quốc",
        description:
          "Mở cổng tiếp nhận hồ sơ trực tiếp và online trên toàn quốc.",
      },
      {
        date: "Tháng 6/2026",
        title: "SƠ KHẢO — Hà Nội",
        description:
          "Thi catwalk và tài năng. Chọn 60 thí sinh vào vòng Bán Kết.",
      },
      {
        date: "Tháng 7–8/2026",
        title: "CHƯƠNG TRÌNH TRUYỀN HÌNH",
        description:
          "Hành trình ghi hình truyền hình thực tế: trải nghiệm cổ phục, làng nghề và thử thách bản lĩnh.",
      },
      {
        date: "Tháng 7–8/2026",
        title: "VÒNG BÁN KẾT CHƯƠNG TRÌNH",
        description:
          "Địa điểm (dự kiến): Hà Nội\nNội dung thi: Lựa chọn 30 thí sinh có điểm cao nhất có mặt trong đêm Chung kết.\n+ Catwalk\n+ Phần thi tài năng",
      },
      {
        date: "Dự kiến 2026",
        title: "VÒNG CHUNG KẾT",
        description:
          "Nội dung thi: 30 thí sinh sẽ cùng có mặt trong đêm Chung kết, lần lượt tham gia các phần sau:\n+ Trình diễn trang phục áo dài\n+ Trình diễn trang phục dạ hội\n+ Phần thi tài năng\n+ Top 5 - Phần thi ứng xử\nCông bố và trao giải thưởng cho các danh hiệu: Quán quân, Quán quân 1, Quán quân 2 và các giải phụ.",
      },
    ],
  },
  {
    id: "timeline-notes",
    type: "richText",
    eyebrow: "Lưu ý",
    title: "Một số lưu ý và yêu cầu",
    body: [
      "• Trang phục dạ hội, trang phục hàng ngày, các phụ kiện đi kèm và trang điểm thí sinh tự chuẩn bị.",
      "• BTC tài trợ phần trang điểm và làm tóc cho thí sinh trong các phần thi & hoạt động chính thức của đêm chung kết (riêng các hoạt động bên lề thí sinh tự trang điểm).",
      "• BTC tài trợ chi phí ăn ở cho thí sinh trong suốt quá trình diễn ra vòng thi chung kết.",
    ].join("\n"),
  },
];

export const finalRoundBlocks = [
  {
    id: "final-round-semifinal",
    type: "richText",
    eyebrow: "Vòng bán kết",
    title: "Vòng bán kết chương trình",
    body: `Địa điểm (dự kiến): Hà Nội\n\nNội dung thi: Lựa chọn 30 thí sinh có điểm cao nhất có mặt trong đêm Chung kết.\n\n• Catwalk\n• Phần thi tài năng`,
  },
  {
    id: "final-round-grand",
    type: "richText",
    eyebrow: "Vòng chung kết",
    title: "Đêm Gala Chung kết",
    body: `Nội dung thi: 30 thí sinh sẽ cùng có mặt trong đêm Chung kết, lần lượt tham gia các phần sau:\n\n• Trình diễn trang phục áo dài\n• Trình diễn trang phục dạ hội\n• Phần thi tài năng\n• Top 5 - Phần thi ứng xử\n\nCông bố và trao giải thưởng cho các danh hiệu: Quán quân, Quán quân 1, Quán quân 2 và các giải phụ.`,
  },
  {
    id: "final-round-notes",
    type: "richText",
    eyebrow: "Lưu ý",
    title: "Một số lưu ý và yêu cầu",
    body: [
      "• Trang phục dạ hội, trang phục hàng ngày, các phụ kiện đi kèm và trang điểm thí sinh tự chuẩn bị.",
      "• BTC tài trợ phần trang điểm và làm tóc cho thí sinh trong các phần thi & hoạt động chính thức của đêm chung kết (riêng các hoạt động bên lề thí sinh tự trang điểm).",
      "• BTC tài trợ chi phí ăn ở cho thí sinh trong suốt quá trình diễn ra vòng thi chung kết.",
    ].join("\n"),
  },
];

export const realityBlocks = [
  {
    id: "reality",
    type: "richText",
    eyebrow: "Truyền hình thực tế",
    title: "Hành trình truyền hình thực tế",
    body: "Nơi cập nhật các tập ghi hình, hoạt động trải nghiệm văn hóa, làng nghề và câu chuyện hậu trường của thí sinh.",
  },
  {
    id: "reality-gallery",
    type: "gallery",
    title: "Khoảnh khắc hành trình",
    images: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

export const auditionBlocks = [
  {
    id: "audition-casting",
    type: "richText",
    eyebrow: "CASTING",
    title: "Đăng ký dự thi — Casting toàn quốc",
    body: `Thời gian đăng ký dự thi: Từ ngày 26/05/2026 đến hết ngày 25/06/2026\nĐịa điểm: Toàn quốc\n\nThí sinh có thể đăng ký dự thi trực tiếp tại các điểm tiếp nhận hồ sơ hoặc qua cổng đăng ký online của chương trình.`,
  },
  {
    id: "audition-sokhao",
    type: "richText",
    eyebrow: "SƠ KHẢO",
    title: "Vòng sơ khảo",
    body: `Thời gian: Tháng 6/2026\nĐịa điểm: Hà Nội\n\n**Nội dung thi:**\n• Trình diễn catwalk theo nhạc\n• Phần thi tài năng\n\nBan giám khảo sẽ chọn 60 thí sinh vào vòng Bán Kết.\n\n**Một số lưu ý và yêu cầu:**\n• Trang phục và trang điểm thí sinh tự chuẩn bị.\n• Các thí sinh phải tự túc chi phí ăn uống và đi lại cho các phần thi sơ khảo.`,
  },
];

export const contestantsBlocks = [
  {
    id: "contestants-intro",
    type: "richText",
    eyebrow: "Ứng viên",
    title: `Ứng viên ${programBrand.shortName}`,
    body: `Những cô gái đến từ mọi miền đất nước — mỗi người mang trong mình một câu chuyện, một bản sắc, một khát vọng riêng. ${programBrand.shortName} là nơi họ tỏa sáng, khẳng định bản lĩnh và lan tỏa vẻ đẹp văn hóa Việt Nam đến với cộng đồng.`,
  },
  {
    id: "contestants-grid",
    type: "featureGrid",
    title: "Hành trình ứng viên",
    items: [
      {
        title: "Hồ sơ thí sinh",
        description:
          "Mỗi ứng viên mang đến câu chuyện cá nhân độc đáo, phản ánh tinh thần người phụ nữ Việt Nam thế hệ mới: bản lĩnh, trí tuệ và giàu cảm xúc văn hóa.",
      },
      {
        title: "Hành trình văn hóa",
        description:
          "Các thí sinh trực tiếp trải nghiệm không gian cổ phục, làng nghề truyền thống và các giá trị di sản phi vật thể của Việt Nam.",
      },
      {
        title: "Lan tỏa cộng đồng",
        description:
          "Từ sân khấu đến mạng xã hội, mỗi ứng viên là một đại sứ tích cực truyền cảm hứng về bản sắc và giá trị văn hóa dân tộc.",
      },
    ],
  },
];

export const newsLandingBlocks = [
  {
    id: "news-landing",
    type: "newsList",
    eyebrow: "Tin tức",
    title: "Tin tức và thông báo mới nhất",
    limit: 6,
  },
];

export const featuredNewsBlocks = [
  {
    id: "featured-news",
    type: "newsList",
    eyebrow: "Tin nổi bật",
    title: "Tin nổi bật",
    limit: 6,
  },
];

export const generalInfoBlocks = [
  {
    id: "general-info",
    type: "newsList",
    eyebrow: "Thông tin chung",
    title: "Thông tin chung",
    limit: 6,
  },
];

export const ticketBlocks = [
  {
    id: "ticket-intro",
    type: "richText",
    eyebrow: "Đặt vé",
    title: "Thông tin đặt vé",
    body: `Đêm Gala Chung kết ${programBrand.name} là sự kiện không thể bỏ lỡ với những ai yêu văn hóa Việt và tài năng trẻ. Vé tham dự sẽ được mở bán chính thức theo từng hạng với quyền lợi rõ ràng. Hãy đặt chỗ sớm để không bỏ lỡ đêm trao giải đặc biệt này.`,
  },
  {
    id: "ticket-cta",
    type: "cta",
    title: "Cần tư vấn vé?",
    body: "Liên hệ ban tổ chức để nhận thông tin đặt vé và quyền lợi khách mời.",
    cta: { label: "Liên hệ", href: "/lien-he" },
  },
];

export const partnersPageBlocks = [
  {
    id: "partners-intro",
    type: "richText",
    eyebrow: "Đơn vị tổ chức",
    title: "Công ty Cổ phần Truyền thông Giải trí TTN Việt Nam",
    body: `TTN Media & Entertainment là đơn vị tổ chức chương trình ${programBrand.name}, phụ trách định hướng sản xuất, truyền thông và vận hành hành trình tuyển sinh, đào tạo, ghi hình và Gala Chung kết.\n\nThông tin liên hệ:\n• Email: contact.ttnmedia@gmail.com\n• Hotline: 0345 708 135\n• Địa chỉ: Số 4, Khu nhà ở Licogi 13, Phường Thanh Xuân Trung, Quận Thanh Xuân, TP. Hà Nội`,
  },
  {
    id: "partners-list",
    type: "sponsors",
    eyebrow: "Đối tác hiện tại",
    title: "LTA Global",
    sponsors: ["LTA Global"],
  },
  {
    id: "partners-cta",
    type: "cta",
    title: "Kết nối cùng ban tổ chức",
    body: "Liên hệ TTN để trao đổi thông tin hợp tác, truyền thông và đồng hành cùng Tài Sắc Việt Nam 2026.",
    cta: { label: "Liên hệ", href: "/lien-he" },
  },
];

export const advertisingContactBlocks = [
  {
    id: "advertising-contact",
    type: "richText",
    eyebrow: "Liên hệ",
    title: "Liên hệ hợp tác",
    body: `${programBrand.name} chào đón các thương hiệu, tổ chức và cá nhân có chung khát vọng tôn vinh văn hóa Việt Nam. Chúng tôi cung cấp nhiều gói hợp tác linh hoạt — từ tài trợ sự kiện, đồng hành truyền thông đến đặt vé doanh nghiệp. Hãy liên hệ để cùng tạo nên dấu ấn.`,
  },
  {
    id: "advertising-options",
    type: "featureGrid",
    title: "Nhu cầu hợp tác",
    items: [
      {
        title: "Tài trợ",
        description:
          "Gói đồng hành thương hiệu, địa điểm, sản phẩm hoặc dịch vụ.",
      },
      {
        title: "Truyền thông",
        description: "Phối hợp báo chí, video, social và nội dung quảng bá.",
      },
      {
        title: "Đặt vé doanh nghiệp",
        description: "Thông tin khu vực khách mời, quyền lợi VIP và đối tác.",
      },
    ],
  },
  {
    id: "advertising-company-info",
    type: "richText",
    eyebrow: "Đơn vị thực hiện",
    title: "Công ty Cổ phần Truyền thông Giải trí TTN Việt Nam",
    body: `📧 Email: contact.ttnmedia@gmail.com\n📞 Hotline: 0345 708 135\n📍 Địa chỉ: Số 4, Khu nhà ở Licogi 13, Phường Thanh Xuân Trung, Quận Thanh Xuân, TP. Hà Nội`,
  },
];

export const sitePageSeeds = [
  {
    slug: "dang-ky-du-thi",
    title: "Đăng ký dự thi",
    seoTitle: `Đăng ký dự thi ${programBrand.name}`,
    seoDescription: "Thông tin đăng ký dự thi trực tiếp và online.",
    blocks: registrationBlocks,
  },
  {
    slug: "dang-ky-du-thi-truc-tiep",
    title: "Đăng ký dự thi trực tiếp",
    seoTitle: "Đăng ký dự thi trực tiếp",
    seoDescription: "Hướng dẫn nộp hồ sơ dự thi trực tiếp.",
    blocks: directRegistrationBlocks,
  },
  {
    slug: "dang-ky-du-thi-online",
    title: "Đăng ký dự thi online",
    seoTitle: "Đăng ký dự thi online",
    seoDescription: "Gửi hồ sơ dự thi trực tuyến.",
    blocks: onlineRegistrationBlocks,
  },
  {
    slug: "lich-trinh",
    title: "Lịch trình",
    seoTitle: `Lịch trình ${programBrand.name}`,
    seoDescription:
      "Lịch trình tuyển sinh, sơ khảo, truyền hình thực tế và chung kết.",
    blocks: timelineBlocks,
  },
  {
    slug: "vong-chung-ket",
    title: "Vòng chung kết",
    seoTitle: "Vòng chung kết",
    seoDescription: "Thông tin vòng chung kết.",
    blocks: finalRoundBlocks,
  },
  {
    slug: "truyen-hinh-thuc-te",
    title: "Truyền hình thực tế",
    seoTitle: "Truyền hình thực tế",
    seoDescription: "Hành trình truyền hình thực tế của cuộc thi.",
    blocks: realityBlocks,
  },
  {
    slug: "so-tuyen-so-khao",
    title: "Sơ tuyển, Sơ khảo",
    seoTitle: "Sơ tuyển, Sơ khảo",
    seoDescription: "Thông tin vòng sơ tuyển và sơ khảo.",
    blocks: auditionBlocks,
  },
  {
    slug: "tai-sac-viet-nam-2026",
    title: programBrand.name,
    seoTitle: programBrand.name,
    seoDescription: `Thông tin chính thức mùa tuyển sinh ${programBrand.name}.`,
    blocks: vietnamTourismQueenBlocks,
  },
  {
    slug: "don-vi-to-chuc",
    title: "Đơn vị tổ chức",
    seoTitle: "Đơn vị tổ chức",
    seoDescription: "Thông tin đơn vị tổ chức cuộc thi.",
    blocks: organizerBlocks,
  },
  {
    slug: "ban-giam-khao",
    title: "Ban giám khảo",
    seoTitle: "Ban giám khảo",
    seoDescription: "Thông tin hội đồng giám khảo.",
    blocks: judgesBlocks,
  },
  {
    slug: "the-le",
    title: "Thể lệ",
    seoTitle: "Thể lệ dự thi",
    seoDescription: "Điều kiện và quy định tham gia cuộc thi.",
    blocks: rulesBlocks,
  },
  {
    slug: "lich-thi",
    title: "Lịch thi",
    seoTitle: "Lịch thi",
    seoDescription: "Mốc thời gian các vòng thi.",
    blocks: examScheduleBlocks,
  },
  {
    slug: "giai-thuong",
    title: "Giải thưởng",
    seoTitle: "Giải thưởng",
    seoDescription: "Cơ cấu giải thưởng cuộc thi.",
    blocks: awardsPageBlocks,
  },
  {
    slug: "giai-dap-thac-mac",
    title: "Giải đáp thắc mắc",
    seoTitle: "Giải đáp thắc mắc",
    seoDescription: "Câu hỏi thường gặp về cuộc thi.",
    blocks: faqBlocks,
  },
  {
    slug: "ung-vien",
    title: "Ứng viên",
    seoTitle: `Ứng viên ${programBrand.shortName}`,
    seoDescription: "Thông tin ứng viên và thí sinh.",
    blocks: contestantsBlocks,
  },
  {
    slug: "tin-tuc",
    title: "Tin tức",
    seoTitle: `Tin tức ${programBrand.shortName}`,
    seoDescription: "Tin tức và thông báo mới nhất.",
    blocks: newsLandingBlocks,
  },
  {
    slug: "tin-noi-bat",
    title: "Tin nổi bật",
    seoTitle: "Tin nổi bật",
    seoDescription: "Các tin nổi bật của cuộc thi.",
    blocks: featuredNewsBlocks,
  },
  {
    slug: "thong-tin-chung",
    title: "Thông tin chung",
    seoTitle: "Thông tin chung",
    seoDescription: "Thông tin chung về cuộc thi.",
    blocks: generalInfoBlocks,
  },
  {
    slug: "dat-ve",
    title: "Đặt vé",
    seoTitle: "Đặt vé",
    seoDescription: "Thông tin đặt vé chương trình.",
    blocks: ticketBlocks,
  },
  {
    slug: "doi-tac",
    title: "Đối tác",
    seoTitle: "Đối tác và nhà tài trợ",
    seoDescription: "Thông tin đối tác và nhà tài trợ đồng hành.",
    blocks: partnersPageBlocks,
  },
  {
    slug: "lien-he",
    title: "Liên hệ",
    seoTitle: "Liên hệ",
    seoDescription: "Thông tin liên hệ hợp tác và tài trợ.",
    blocks: advertisingContactBlocks,
  },
];

export const postBlocks = [
  {
    id: "post-body",
    type: "richText",
    eyebrow: "Thông báo",
    title: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
    body: "Ban tổ chức công bố hành trình truyền hình thực tế kết hợp giải trí hiện đại và chiều sâu văn hóa di sản. Bài viết này được hiển thị từ các khối CMS giống như các trang nội dung.",
  },
  {
    id: "post-gallery",
    type: "gallery",
    title: "Hình ảnh truyền thông",
    images: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];
