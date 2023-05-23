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





<!DOCTYPE html>
<html>
<head>
  <title>Tag Input Field</title>
  <style>
    .tag {
      display: inline-block;
      padding: 5px;
      background-color: #f0f0f0;
      margin: 5px;
      border-radius: 5px;
    }
    .tag span {
      margin-left: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="tag-container">
    <input type="text" id="tag-input" placeholder="Enter tags..." />
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
      var tagsArray = []; // Array to store tags

      $('#tag-input').on('keydown', function(event) {
        var tagInput = $(this);
        var tagsContainer = $('#tag-container');

        if (event.which === 13 || event.which === 32) {
          // Prevent form submission
          event.preventDefault();

          // Get the entered tag value
          var tagValue = tagInput.val().trim();

          if (tagValue !== '') {
            // Create a new tag element
            var tagElement = $('<div class="tag"><span>&times;</span>' + tagValue + '</div>');

            // Append the tag element to the container
            tagsContainer.append(tagElement);

            // Clear the input field
            tagInput.val('');

            // Add the tag to the array
            tagsArray.push(tagValue);
          }
        }
      });

      $('#tag-container').on('click', '.tag span', function() {
        var tagElement = $(this).parent();

        // Remove the tag from the array
        var tagValue = tagElement.text().trim();
        var index = tagsArray.indexOf(tagValue);
        if (index !== -1) {
          tagsArray.splice(index, 1);
        }

        // Remove the tag element from the container
        tagElement.remove();
      });
    });
  </script>
</body>
</html>



