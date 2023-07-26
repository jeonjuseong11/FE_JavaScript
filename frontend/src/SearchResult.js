class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement(`section`);
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  listObserver = new IntersectionObserver((items, observer) => {
    console.log(items);
    items.forEach((item) => {
      //아이템이 화면에 보일 때
      if (item.isIntersecting) {
        //화면에 보이면 이미지를 로드
        item.target.querySelector("img").src =
          item.target.querySelector("img").dataset.src; //dataset에 src로 대체함

        //마지막 요소를 찾아낸다.
        // console.log(this.data.length);
        let dataIndex = Number(item.target.dataset.index);
        console.log(dataIndex);
        if (dataIndex + 1 === this.data.length) {
          // console.log("마지막 페이지");
          this.onNextPage();
        }
        //마지막 요소라면 nextPage 호출
      }
    });
  });

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <li class="item" data-index=${index}> 
            <img src="https://via.placeholder.com/200x300" data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}
