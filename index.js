// console.log(123)
const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

puppeteer.use(StealthPlugin())
const fs = require("fs")


async function run(el) {

    const browser= await puppeteer.launch({headless:false})

    const page=await browser.newPage()

    await page.goto('https://in.indeed.com/')

    await page.screenshot({ path: "innddid.png", fullPage: true });

	await page.type("#text-input-what", el);

	await page.click("[type=submit]")

	await page.waitForTimeout(8000);

	const allJob = await page.evaluate(() => {
		const data = document.querySelectorAll(
			"#mosaic-provider-jobcards > ul > li"
		)
		let collectData = [];
		data.forEach((el) => {


			let array = el.innerText;
			array = array.trim().split("\n");
			let firstElement = ""
				secElement = ""


			for (let i = 4; i < array.length; i++) {


				firstElement = firstElement + array[i] + ".";
			}
			for (let i = 3; i < array.length; i++) {
				secElement = secElement + array[i] + ".";
			}
			let obj = {
				data: array[0],
				comapny_name: array[1] == "one" ? array[2] : array[1],
				location: array[1] == "two " ? array[3] : array[2],
				description: array[1] == "three" ? firstElement : secElement,
			};
			collectData.push(obj);
		});
		return collectData;
	});

	console.log(allJob)
	await browser.close()


	fs.writeFile("db.json", JSON.stringify(allJob), (error) => {
		if (error) console.log(error)
		else console.log("data saved in db.json")
	})
}

run("Full stack web developer");





<!DOCDOCTYPETYPE html>
<html>
<head>
  <title>Tag Input Field</title>

    .tag {
      display: inline-block;
      background-color: #f2f2f2;
      padding: 5px;
      margin: 5px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <input type="text" id="tagInput" placeholder="Enter tags" />
  <div id="tagContainer"></div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
      var tags = []; // Array to store the tags

      // Function to add a tag
      function addTag(tag) {
        var tagElement = $('<div class="tag">' + tag + '</div>');
        $('#tagContainer').append(tagElement);
      }

      // Function to handle tag input
      function handleTagInput() {
        var tag = $('#tagInput').val().trim();

        if (tag !== '') {
          tags.push(tag); // Add tag to the array
          addTag(tag); // Add tag to the container
          $('#tagInput').val(''); // Clear the input field
        }
      }

      // Handle tag input when Enter key is pressed
      $('#tagInput').on('keydown', function(event) {
        if (event.which === 13 || event.keyCode === 13) {
          handleTagInput();
          return false;
        }
      });

      // Handle tag input when a comma is entered
      $('#tagInput').on('input', function() {
        var value = $(this).val();
        if (value.slice(-1) === ',') {
          handleTagInput();
        }
      });
    });
  </script>
</body>
</html>



<!DOCTYPE html>
<html>
<head>
  <title>Tag Input Field</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <input type="text" id="tagInput" placeholder="Enter tags">
  <button id="addTagButton">Add Tag</button>
  <ul id="tagList"></ul>

  <script>
    $(document).ready(function() {
      var tags = [];

      $('#addTagButton').click(function() {
        var tag = $('#tagInput').val().trim();

        if (tag !== '') {
          tags.push(tag);
          $('#tagList').append('<li>' + tag + '</li>');
          $('#tagInput').val('');
        }
      });
    });
  </script>
</body>
</html>


