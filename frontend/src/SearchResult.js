import Empty from "./Empty.js";

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

    this.Empty = new Empty({
      $target,
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData);
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        // 화면에 보이면 이미지를 로드
        const img = item.target.querySelector("img");
        img.src = img.dataset.src; // dataset에 src로 대체함

        // 마지막 요소를 찾아낸다.
        let dataIndex = Number(item.target.dataset.index);
        console.log(dataIndex);
        if (dataIndex + 1 === this.data.length) {
          this.onNextPage();
        }
        // 마지막 요소라면 nextPage 호출
      }
    });
  });

  render() {
    // 데이터가 null 또는 undefined일 경우, 아무것도 렌더링하지 않습니다.
    if (this.data.length === null || this.data.length === 0) {
      this.$searchResult.style.display = "none";
      return;
    }
    this.$searchResult.style.display = "grid";

    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
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

export default SearchResult;
