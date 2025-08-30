let pokemonName = document.getElementById('pokemonName');
let pokemonImage = document.getElementById('pokemonImage');

let pokemonNumber = Math.floor(Math.random() * 898) + 1;

let imageUrls = []; // 画像URLを格納する配列
let currentIndex = 0; // 現在表示している画像のインデックス

// ポケモンの名前を取得
fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`)
.then(response => response.json())
.then(data => {
  let names = data.names;
  for (let i = 0; i < names.length; i++) {
    if (names[i].language.name === 'ja') {
      pokemonName.textContent = names[i].name;
      break;
    }
  }
})
.catch(error => console.error(`名前の取得中にエラーが発生しました:${error}`));

// ポケモンの画像を取得し、回転表示を開始
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
.then(response => response.json())
.then(data => {
  // 表示したい画像をimageUrls配列に追加
  // 必要に応じて他のビューも追加してください
  if (data.sprites.front_default) imageUrls.push(data.sprites.front_default);
  if (data.sprites.back_default) imageUrls.push(data.sprites.back_default);
  if (data.sprites.front_shiny) imageUrls.push(data.sprites.front_shiny);
  if (data.sprites.back_shiny) imageUrls.push(data.sprites.back_shiny);
  // 公式アートワークも追加したい場合はここに入れる
  if (data.sprites.other && data.sprites.other['official-artwork'] && data.sprites.other['official-artwork'].front_default) {
    imageUrls.push(data.sprites.other['official-artwork'].front_default);
  }


  if (imageUrls.length > 0) {
    pokemonImage.src = imageUrls[currentIndex]; // 最初の画像を表示

    // 2秒ごとに画像を切り替える
    setInterval(() => {
      currentIndex = (currentIndex + 1) % imageUrls.length; // インデックスを更新
      pokemonImage.src = imageUrls[currentIndex]; // 新しい画像を表示
    }, 2000); // 2000ミリ秒 = 2秒
  } else {
    pokemonImage.alt = "画像がありません。";
  }
})
.catch(error => console.error(`画像の取得中にエラーが発生しました:${error}`));