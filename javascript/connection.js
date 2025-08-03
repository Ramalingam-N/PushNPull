let allData = new Object();
let historys = [];
var editor;
var editor2;

try {
	editor = CodeMirror.fromTextArea(document.querySelector(".body-editor"), {
		lineNumbers: true,
		mode: "application/json",
		theme: "dracula",
		matchBrackets: true,
		styleActiveLine: true,
		lineWrapping: true,
	});

	editor.getWrapperElement().style.color = "#575757";
} catch (err) {}

try {
	editor2 = CodeMirror.fromTextArea(
		document.querySelector(".response-editor"),
		{
			lineNumbers: true,
			mode: "application/json",
			theme: "dracula",
			matchBrackets: true,
			styleActiveLine: true,
			lineWrapping: true,
			indentWithTabs: true,
			smartIndent: true,
		}
	);

	editor2.setOption("readOnly", true);
	editor2.getWrapperElement().style.width = "94%";
	editor2.getWrapperElement().style.color = "#575757";
} catch (err) {}

let collectData = () => {
	let method = document.querySelector(".select-method").value;
	allData.method = method;

	let url = document.querySelector(".url-input").value;
	allData.url = url;

	let headerValues = new FormData();
	let headerForm = document.querySelectorAll(".header-form-1");
	headerForm.forEach((form) => {
		const key = form.querySelector("input[placeholder='key']").value;
		const value = form.querySelector("input[placeholder='value']").value;

		if (key && value) {
			headerValues.append(key, value);
		}
	});

	const selectingAuth = document.querySelector(".selecting-auth");
	const bearerInput = document.querySelector(".bearer-input");
	const basicAuthDiv = document.querySelector(".basic-auth-div");

	let bearerValue;
	let basicAuthValue;
	if (selectingAuth.value != "no-auth") {
		bearerValue = bearerInput.value;
		let username = basicAuthDiv.querySelector(
			"input[placeholder='Username']"
		).value;
		let password = basicAuthDiv.querySelector(
			"input[placeholder='Password']"
		).value;
		basicAuthValue = { username, password };
	}

	if (bearerValue && basicAuthValue) {
		headerValues.append(
			"Authorization",
			`Basic ${btoa(
				basicAuthValue.username + ":" + basicAuthValue.password
			)}`
		);
		headerValues.append("Authorization", `Bearer ${bearerValue}`);
	} else if (bearerValue) {
		headerValues.append("Authorization", "Bearer " + bearerValue);
	} else if (basicAuthValue) {
		headerValues.append(
			"Authorization",
			`Basic ${btoa(
				basicAuthValue.username + ":" + basicAuthValue.password
			)}`
		);
	}

	const bodyRadioBtns = document.querySelectorAll("input[name='body-type']");
	let checkedRadioBtn;
	bodyRadioBtns.forEach((radioBtn) => {
		if (radioBtn.checked) {
			checkedRadioBtn = radioBtn.value;
		}
	});

	if (checkedRadioBtn == "form-data") {
		let bodyFormValues = new FormData();
		let bodyForm = document.querySelectorAll(".header-form-2");
		bodyForm.forEach((form1) => {
			const key = form1.querySelector("input[placeholder='key']").value;
			const value = form1.querySelector(
				"input[placeholder='value']"
			).value;

			if (key && value) {
				bodyFormValues.append(key, value);
			}
		});
		headerValues.append("Content-Type", "application/json");
		let bodyObj = formDataToJSON(bodyFormValues);
		allData.bodyData = bodyObj;
	} else if (checkedRadioBtn == "raw") {
		let bodyRawSelect = document.querySelector(".body-raw-select");
		let editorBodyData = editor.getValue();
		bodyRawFormat = bodyRawSelect.value;

		if (bodyRawFormat == "json") {
			headerValues.append("Content-Type", "application/json");
			allData.bodyData = editorBodyData;
		} else if (bodyRawFormat == "text") {
			headerValues.append("Content-Type", "text/plain");
			allData.bodyData = editorBodyData;
		} else if (bodyRawFormat == "xml") {
			headerValues.append("Content-Type", "application/xml");
			allData.bodyData = editorBodyData;
		} else if (bodyRawFormat == "html") {
			headerValues.append("Content-Type", "text/html");
			allData.bodyData = editorBodyData;
		}
	}

	let headerObj = formDataToJSON(headerValues);
	allData.header = headerObj;
};

document.querySelector(".url-send").addEventListener("click", () => {
	collectData();
	pushNPull(allData);
});

document.addEventListener("keydown", (event) => {
	if (
		event.key == "Enter" &&
		document.activeElement === document.querySelector(".url-input")
	) {
		collectData();
		pushNPull(allData);
	}
});

let pushNPull = (allData) => {
	if (!allData.url) return;

	let urlInput = document.querySelector(".url-input");
	let intervalId1 = setInterval(() => {
		urlInput.style.backgroundColor = "rgb(200, 200, 200)";
	}, 100);
	let x = 200;
	let intervalId2 = setInterval(() => {
		urlInput.style.backgroundColor = "white";
		x = 100;
	}, x);

	const startTime = performance.now();
	fetch("http://localhost:3000/", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(allData),
	})
		.then((response) => {
			const endTime = performance.now();
			clearInterval(intervalId1);
			clearInterval(intervalId2);
			const duration = endTime - startTime;
			urlInput.style.backgroundColor = "white";

			urlInput.addEventListener("mouseenter", () => {
				urlInput.style.backgroundColor = "rgb(239, 239, 239)";
			});

			urlInput.addEventListener("mouseleave", () => {
				urlInput.style.backgroundColor = "white";
			});

			const contentLength = response.headers.get("Content-Length");

			document.querySelector(".status-code").textContent =
				response.status;
			document.querySelector(".status-text").textContent =
				response.statusText;
			document.querySelector(".time").textContent = duration.toFixed(2);
			document.querySelector(".size").textContent = contentLength;

			let tbody = document.querySelector(".header-tbody");
			tbody.innerHTML = "";

			let time;
			response.headers.forEach((value, key) => {
				if (key == "date") {
					time = value;
				}
				let tr = document.createElement("tr");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				td1.textContent = key;
				td2.textContent = value;
				tr.appendChild(td1);
				tr.appendChild(td2);
				tbody.appendChild(tr);
			});

			let fullHistory = document.querySelector(".history-datas-div");

			let historyData = document.createElement("div");
			historyData.classList.add("history-data");

			let imageUrlMethod = document.createElement("div");
			imageUrlMethod.classList.add("image-history-url-div");

			let timeImg = document.createElement("img");
			timeImg.setAttribute("src", "/images/clock.png");
			timeImg.setAttribute("height", "20");
			timeImg.setAttribute("title", time);

			let urlMethod = document.createElement("div");
			urlMethod.classList.add("history-url-method-div");

			let methodP = document.createElement("p");
			methodP.innerHTML = `<b>${allData.method
				.toString()
				.toUpperCase()}</b>`;

			let p = document.createElement("p");
			p.innerHTML = " - ";

			let urlP = document.createElement("p");
			urlP.classList.add("history-url-method-div-p");

			let url;
			if (allData.url.toString().length >= 42) {
				url = allData.url.toString().substring(0, 39) + "...";
			} else {
				url = allData.url;
			}
			urlP.setAttribute("title", allData.url);
			urlP.textContent = url;

			urlMethod.appendChild(methodP);
			urlMethod.appendChild(p);
			urlMethod.appendChild(urlP);

			imageUrlMethod.appendChild(timeImg);
			imageUrlMethod.appendChild(urlMethod);

			let deleteImg = document.createElement("img");
			deleteImg.setAttribute("title", "delete");
			deleteImg.setAttribute("src", "/images/delete.png");
			deleteImg.setAttribute("height", "16");

			historyData.appendChild(imageUrlMethod);
			historyData.appendChild(deleteImg);

			fullHistory.appendChild(historyData);

			let duplicateAllData = JSON.parse(JSON.stringify(allData));
			historys.push(duplicateAllData);
			urlMethod.addEventListener("click", (event) => {
				let index = 0;
				if (
					document.querySelectorAll(".history-data") instanceof
					NodeList
				) {
					document
						.querySelectorAll(".history-data")
						.forEach((history, i) => {
							if (history === historyData) {
								index = i;
							}
						});
				}
				pushNPull(historys[index]);
			});

			deleteImg.addEventListener("click", () => {
				historyData.remove();
			});

			const contentType = response.headers.get("Content-Type");
			if (contentType && contentType.includes("application/json")) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			allData.bodyData = null;

			if (typeof data === "object" && data !== null) {
				if (data.responseData) {
					let editorData = JSON.stringify(data.responseData, null, 2);
					editor2.setValue(editorData);
				} else {
					let editorData = JSON.stringify(data, null, 2);
					editor2.setValue(editorData);
				}
			} else {
				editor2.setValue(data);
			}
		})
		.catch((err) => {
			let editorData = JSON.stringify(err, null, 2);
			editor2.setValue(editorData);
		});
};

function formDataToJSON(formData) {
	let object = {};
	formData.forEach((value, key) => {
		object[key] = value;
	});

	return JSON.stringify(object);
}
