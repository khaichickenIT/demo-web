document.addEventListener("DOMContentLoaded", function () {
  // GỬI FORM ẨN DANH
  const messageForm = document.getElementById("message");
  if (messageForm) {
    messageForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn việc gửi form theo cách mặc định

      const form = event.target;

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.text(); // Đọc phản hồi dưới dạng văn bản
          } else {
            throw new Error("Có lỗi xảy ra khi gửi.");
          }
        })
        .then((text) => {
          alert("Lời nhắn đã được gửi thành công!");
          // Xử lý thông tin phản hồi nếu cần
          console.log("Phản hồi:", text);
          // Tải lại form nếu cần
          form.reset();
        })
        .catch((error) => {
          console.error("Lỗi:", error);
          alert("Có lỗi xảy ra khi gửi form.");
        });
    });
  }

  //PHẦN SỞ THÍCH XỔ XUỐNG
  function toggle() {
    var favourites = document.getElementById("favourites");
    if (favourites) {
      favourites.classList.toggle("show");
    }
  }

  const favouritesButton = document.getElementById("fv-btn");
  if (favouritesButton) {
    favouritesButton.addEventListener("click", toggle);
  }

  //IN ĐẬM MENU TRANG ĐANG TRUY CẬP
  var currentUrl = window.location.pathname.split("/").pop();
  var links = document.querySelectorAll(".menu a");

  var isActiveSet = false;

  links.forEach(function (link) {
    var linkHref = link.getAttribute("href");
    if (currentUrl === linkHref) {
      link.classList.add("active");
      isActiveSet = true;
    }
  });

  // Nếu không có liên kết nào khớp, đặt mặc định cho liên kết "Trang chủ"
  var homeLink = document.getElementById("home");
  if (homeLink && !isActiveSet) {
    homeLink.classList.add("active");
  }

  //NGHE NHẠC KHI ẤN VÀO ẢNH
  const spotImage = document.getElementById("spotImage");
  if (spotImage) {
    spotImage.addEventListener("click", function () {
      var audio = document.getElementById("audioPlayer");
      if (audio) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    });
  }

  //RANDOM CHÂM NGÔN
  const quotes = [
    "Tài sản có thể trở về số 0 nhưng kiến thức phải càng ngày càng mở rộng.",
    "Thời gian tốt nhất để trồng cây là vào 20 năm trước. Thời gian tốt thứ hai là ngay bây giờ.",
    "Điếc, nhưng không phải là không biết gì bởi còn có thể đọc được sách báo.",
    "Nếu không học tập, cho dù đi vạn dặm đường xa thì mãi vẫn chỉ là người đưa thư mà thôi.",
    "Ai cũng than vãn thiếu tiền nhưng chả ai than thở thiếu trí khôn cả.",
    "Trên đời có 3 thứ không thể bị ai cướp mất: Đầu tiên là thức ăn đã vào trong dạ dày, hai là ước mơ đã ở trong lòng, ba là những kiến thức đã học trong đầu.",
    "Người lớn dạy trẻ con học nói, còn trẻ con dạy người lớn im lặng.",
    "Một người chỉ ra sai sót của bạn chưa chắc đã là kẻ thù của bạn; một người luôn luôn ca ngợi bạn chưa hẳn đã là bạn của bạn.",
    "Hãy sợ con dê húc phía trước, con ngựa đá phía sau, còn kẻ ngu thì phải đề phòng tứ phía.",
    "Kinh nghiệm là cái từ mà mọi người dùng để gọi các sai lầm của mình.",
    "Khi bạn khóc vì không có giày để đi, hãy nhìn những người không có chân.",
    "Khi già đi người ta thị lực kém đi nhưng nhìn thấy nhiều hơn.",
    "Đừng sợ đi chậm. Chỉ sợ đứng yên.",
    "Ta không cầu xin cho gánh nặng sẽ nhẹ hơn. Nhưng cho đôi vai hãy vững vàng hơn.",
    "Bông lúa càng nhiều hạt, đầu nó càng rủ xuống. Người giỏi thường hay khiêm tốn.",
    "Mất tiền chỉ là mất nửa đời người, mất lòng tin là mất tất cả.",
    "Phần lớn người ta thất bại không phải do họ không có khả năng, mà là vì ý chí không kiên định.",
    "Đừng nói gì trừ khi bạn đã học được cách im lặng.",
    "Giúp người thì sẽ làm tăng tài sản, ki bo chỉ làm nghèo đi.",
    "Một hành trình ngàn dặm cũng chỉ khởi đầu từ bước đi đầu tiên.",
    "Nếu vấn đề nào giải quyết được bằng tiền, thì đó không phải là vấn đề mà là chi phí.",
    "Nếu bạn bị vấp ngã, điều đó chưa chắc có nghĩa bạn đang đi sai đường.",
    "Có tiền cũng không tốt lắm, cũng như thiếu tiền cũng chẳng tồi lắm.",
    "Không có tình huống vô vọng, chỉ có giải pháp không chính xác.",
    "Chúa trời cho con người hai tai và một miệng để nghe nhiều nói ít.",
    "Luôn luôn nhìn vào mặt tươi sáng của sự vật. Nếu không thấy, hãy đánh bóng cho đến khi nó tỏa sáng.",
    "Nếu cuộc sống không dần dần tốt lên thì nó sẽ kém đi.",
    "Đừng sợ rằng bạn không biết một cái gì đó. Hãy sợ rằng bạn không chịu tìm hiểu về nó.",
    "Con người phải sống tối thiểu là vì sự tò mò.",
    "Một khi bạn mắc một sai lầm, điều tốt nhất bạn có thể làm là cười vào nó.",
    "Nếu mà làm từ thiện chẳng tốn kém gì thì ai cũng làm từ thiện cả.",
    "Hầu như những loại hoa có màu trắng đều rất thơm, hoa có màu sắc đẹp đẽ thường không thơm. Người cũng vậy, càng mộc mạc giản dị, càng tỏa hương thơm từ bên trong.",
    "Chết vì cười còn hơn là chết vì hoảng sợ.",
    "Một người đàn ông có thể chuyển núi bắt đầu từ việc mang đi những viên đá nhỏ.",
    "Khi chúng ta đem hoa tặng cho người khác thì người ngửi được mùi hương đầu tiên là chính chúng ta. Khi chúng ta nắm bùn ném vào người khác, thì người bị làm bẩn đầu tiên là bàn tay chúng ta.",
    "Ngủ trên gối êm không có nghĩa có giấc mơ đẹp.",
    "Nếu bạn không thể xử lý những việc nhỏ thì những việc lớn của bạn sẽ trở nên vô nghĩa.",
    "Khi bồ câu kết bạn với quạ, mặc dù cánh của nó vẫn còn màu trắng nhưng trái tim thì dần dần chuyển sang màu đen.",
    "Lúc nào vô công rỗi nghề thì người ta sẽ làm những việc long trời lở đất.",
    "Khi còn trẻ phải làm những việc bạn nên làm, thì khi về già mới có thể làm những việc bạn muốn làm.",
    "Cái khuy áo đầu tiên sai, cái sau cùng khó mà chữa được.",
    "Hạnh phúc chỉ đến khi cánh cửa đã được mở.",
    "Một ngôi nhà nhỏ đầy ắp tiếng cười có giá trị hơn một cung điện đầy nước mắt.",
    "Cười là loại mĩ phẩm rẻ nhất, vận động là loại y dược rẻ nhất, chào hỏi là loại chi phí giao tiếp rẻ nhất.",
    "Kinh nghiệm giống như một chiếc lược mà cuộc đời chỉ ban tặng sau khi chúng ta đã mất hết cả tóc.",
    "Nếu bạn thực sự có tài năng thì bạn sẽ không sợ mình kém may mắn.",
    "Tình yêu có ngọt ngào đến đâu cũng chẳng lấy ra nấu chè được.",
    "Chúa trời bảo vệ kẻ nghèo ít nhất là không sa vào những thói hư tật xấu xa hoa.",
    "Chúa không thể có mặt đồng thời khắp nơi nên Người đã tạo ra các bà mẹ.",
    "Adam quả là tay gặp may đầu tiên vì chẳng có mẹ vợ."
];


  const newQuoteButton = document.getElementById("new-quote");
  const quoteElement = document.getElementById("quote");

  if (newQuoteButton && quoteElement) {
    newQuoteButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteElement.innerText = quotes[randomIndex];
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const container = document.querySelector(".container");

  // Kiểm tra xem người dùng đã chọn dark mode trước đó chưa
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme === "dark-theme") {
    container.classList.add("dark-theme");
    if (themeToggle) {
      themeToggle.checked = true; // Đồng bộ checkbox trạng thái với dark mode
    }
  }

  // Sự kiện khi gạt nút chuyển đổi
  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      if (themeToggle.checked) {
        container.classList.add("dark-theme");
        localStorage.setItem("selectedTheme", "dark-theme");
      } else {
        container.classList.remove("dark-theme");
        localStorage.removeItem("selectedTheme");
      }
    });
  }
});