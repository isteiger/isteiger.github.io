document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("generate-json-btn").addEventListener("click", function () {
    var data = gatherFormData();
    if (!validateForm(data)) {
      return;
    }

    var courses = [];
    for (var i = 0; i < data.courses.length; i++) {
      var c = data.courses[i];
      courses.push({
        "department": c.department,
        "number": c.number,
        "name": c.name,
        "reason": c.reason
      });
    }

    var links = [];
    for (var j = 0; j < data.links.length; j++) {
      var l = data.links[j];
      if (l.name && l.href) {
        links.push({ "name": l.name, "href": l.href });
      }
    }

    var imgSrc = data.imageSrc.indexOf("data:") === 0 ? "[uploaded image data]" : data.imageSrc;

    var jsonObj = {
      "firstName": data.firstName,
      "middleName": data.middleName || null,
      "nickname": data.nickname || null,
      "lastName": data.lastName,
      "acknowledgmentStatement": data.ackStatement,
      "acknowledgmentDate": data.ackDate,
      "divider": data.divider,
      "mascotAdjective": data.mascotAdjective,
      "mascotAnimal": data.mascotAnimal,
      "image": imgSrc,
      "imageCaption": data.imageCaption,
      "personalStatement": data.personalStatement,
      "personalBackground": data.personalBackground,
      "professionalBackground": data.professionalBackground,
      "academicBackground": data.academicBackground,
      "subjectBackground": data.subjectBackground,
      "primaryComputer": data.primaryComputer,
      "backupComputer": data.backupComputer,
      "courses": courses,
      "quote": data.quote,
      "quoteAuthor": data.quoteAuthor,
      "funnyThing": data.funnyThing || null,
      "shareItem": data.shareItem || null,
      "links": links
    };

    var jsonString = JSON.stringify(jsonObj, null, 2);

    var main = document.querySelector("main");
    main.innerHTML = "<h2>Introduction JSON</h2>"
      + "<p>Highlight all text below to copy your introduction JSON:</p>"
      + "<section><pre><code class=\"language-json\" id=\"json-output\"></code></pre></section>"
      + "<hr><p><a href=\"intro_form.html\">&#8635; Start Over</a></p>";

    document.getElementById("json-output").textContent = jsonString;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }
  });
});
