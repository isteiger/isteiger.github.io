document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generate-html-btn").addEventListener("click", () => {
    const data = gatherFormData();
    if (!validateForm(data)) return;

    const courseLines = data.courses
      .map(
        (c) =>
          `    <li><b>${escapeHtml(c.department + c.number)} - ${escapeHtml(c.name)}:</b> ${escapeHtml(c.reason)}</li>`
      )
      .join("\n");

    const linkItems = data.links
      .filter((l) => l.name && l.href)
      .map((l) => `        <a href="${escapeAttr(l.href)}">${escapeHtml(l.name)}</a>`)
      .join(" |\n");

    const funnyLine = data.funnyThing
      ? `    <li><b>Funny/Interesting item to remember me by:</b> ${escapeHtml(data.funnyThing)}</li>\n`
      : "";
    const shareLine = data.shareItem
      ? `    <li><b>I'd also like to share:</b> ${escapeHtml(data.shareItem)}</li>\n`
      : "";

    const imgSrc = data.imageSrc.startsWith("data:") ? "[uploaded image data]" : escapeAttr(data.imageSrc);

    const heading = buildNameHeading(data);

    const htmlOutput = `<h1>${escapeHtml(heading)}</h1>
<figure>
    <img
        src="${imgSrc}"
        alt="${escapeHtml(data.firstName + " " + data.lastName)}"
    />
    <figcaption>${escapeHtml(data.imageCaption)}</figcaption>
</figure>
<p>${escapeHtml(data.personalStatement)}</p>
<ul>
    <li><b>Personal Background:</b> ${escapeHtml(data.personalBackground)}</li>
    <li><b>Professional Background:</b> ${escapeHtml(data.professionalBackground)}</li>
    <li><b>Academic Background:</b> ${escapeHtml(data.academicBackground)}</li>
    <li><b>Background in this Subject:</b> ${escapeHtml(data.subjectBackground)}</li>
    <li><b>Primary Work Computer:</b> ${escapeHtml(data.primaryComputer)}</li>
    <li><b>Backup Work Computer &amp; Location Plan:</b> ${escapeHtml(data.backupComputer)}</li>
    <li><b>Courses I'm Taking &amp; Why:</b>
        <ol>
${courseLines}
        </ol>
    </li>
${funnyLine}${shareLine}</ul>
<blockquote>
    &ldquo;${escapeHtml(data.quote)}&rdquo; <br><cite>- ${escapeHtml(data.quoteAuthor)}</cite>
</blockquote>
<p>
${linkItems}
</p>
<p>Page designed by <a href="isteigerdesign.com/index.html">isteigerDesign</a></p>`;

    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML</h2>
      <p>Highlight all text below to copy your introduction HTML:</p>
      <section>
        <pre><code class="language-html" id="html-output"></code></pre>
      </section>
      <hr>
      <p><a href="intro_form.html">&#8635; Start Over</a></p>
    `;

    document.getElementById("html-output").textContent = htmlOutput;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }
  });
});
