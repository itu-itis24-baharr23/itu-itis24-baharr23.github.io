// Skor
let score = 0;
// Can
let life = 3;

// Kelimeler
const words = ['ADIEU', 'SYNTH', 'STOCK', 'NYMPH', 'BLAST', 'UNITY', 'PRISM', 'CHEST', 'CLOUD', 'BLINK'];

// Listeden kelime seçiyoruz
let word = words[3]; // Örnek olarak 3. kelimeyi seçtik

// Kelimeyi diziye çeviriyoruz
let wordArray = word.split('');

// kullanıcının girdiği doğru harfleri tutacağımız array
let userArray = ['', '', '', '', ''];

// canları yazdırıyoruz
function printHearts(l) {
    let hearts = document.querySelectorAll('.heart');
    for (let i = 0; i < 3; i++) {
        if (i >= l) {
            hearts[i].style.display = 'none';
        }
        else {
            hearts[i].style.display = 'inline';
        }
    }
}

//tüm inputları temizle
function clearInputs() {
    let inputs = document.querySelectorAll('.input');
    inputs.forEach((input, index) => {
        input.value = userArray[index];
    });
}

// Oyunu bitir
function endGame(status) {
    let messageError = document.querySelector('.message-error');
    let messageSuccess = document.querySelector('.message-success');
    if (status === 'success') {
        messageSuccess.style.display = 'block';
    } else {
        messageError.style.display = 'block';
    }
    // butonun yazısını değiştir
    btn.innerText = 'Yeniden Oyna';
    // butona tıklanınca sayfayı yenile
    btn.onclick = function () {
        location.reload();
    }
}

// Butona tıklanınca
function submitButton() {
    // İnputları alıp gerçek kelimeyle karşılaştırıyoruz
    // eğer doğruysa userArray'e ekliyoruz
    // eğer yanlışsa canı azaltıyoruz
    // eğer iki yada daha fazla hatalı giriş yaparsa oyunu bitiriyoruz
    let inputs = document.querySelectorAll('.input');
    let incorrect = 0;
    let correct = 0;
    inputs.forEach((input, index) => {
        if (input.value.toUpperCase() === userArray[index]) {
            // doğruysa bir şey yapma
        } else
            if (input.value.toUpperCase() === wordArray[index]) {
                userArray[index] = input.value.toUpperCase();
                correct++;
                //doğruysa o inputu disable yap
                input.disabled = true;
                //doğruysa o inputun rengini yeşil yap
                input.style.borderBottom = '3px solid green';
                input.style.color = 'green';
            } else if (input.value === '') {
                // boşsa bir şey yapma

            } else {
                incorrect++;
            }
    });
    clearInputs();
    if (incorrect === 1) {
        life--;
        printHearts(life);
        if (life === 0) {
            endGame('error');
        }

    } else if (incorrect > 1) {
        life = 0;
        printHearts(life);
        endGame('error');
    }
    else {
        score += 20 * correct;
        document.getElementById('score').innerText = score;
        if (userArray.join('') === word) {
            endGame('success');
        }
    }

}

// onload 
window.onload = function () {
    // Skoru yazdırıyoruz
    document.getElementById('score').innerText = score;

    // Canları yazdırıyoruz
    printHearts(life);

    clearInputs();

    // 0 - 9 aralığında tamsayı dahil edinceye kadar döngü kuruyoruz
    do {
        var numara = parseInt(window.prompt("Öğrenci numaranızın son hanesini dahil edin", ""), 10);
    } while (isNaN(numara) || numara > 9 || numara < 0);

    word = words[numara];

    wordArray = word.split('');

    // Kontrol Et butonu
    let btn = document.getElementById('btn');

    // Butona tıklanınca submitButton fonksiyonunu çalıştır
    btn.addEventListener('click', submitButton);

}
