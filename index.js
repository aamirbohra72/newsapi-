var express = require("express");
var app = new express();
var request = require("request");
var server_port = 4000;

var api_url ="https://newsapi.org/v2/everything?q=tesla&from=2022-05-29&sortBy=publishedAt&apiKey=0b1a80852e2a4925ae73b7649a42b3e5"

app.listen(server_port, function(){

	console.log("Server started on port : " + server_port);
});

app.get("/", function(expReq, expRes){

	request({
		uri: api_url,
		method: 'GET'
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
	  							 table thead th{
	  							 	background-color: #a7d6fc;
	  							 	color: #020801;
	  							 }
	  							 </style>
	  							 <table>
	  							 <thead>
	  							 <th>
	  							 urlToImage 
	  							 </th>
	  							 <th>
	  							 title
	  							 </th>
	  							 <th>
	  							 description
	  							 </th>
	  							 <th>
	  							 url
	  							 </th>
	  							 <th>
	  							 author
	  							 </th>
	  							 <th>
	  							 publishedAt
	  							 </th>
	  							 <th>
	  							 content
	  							 </th>
								 <th>
								 id
								 </th>
								 </thead><tbody>`;

								 data = data.articles;

								 for (var rec in data ) {
								 	finalResponse += `
								 					 <tr>
								 					 <td>
								 					 <img src="${data[rec].urlToImage}" style="width:200px;" />
								 					 </td>
								 					 <td>
								 					 ${data[rec].title}
								 					 </td>
								 					 <td>
								 					 ${data[rec].description}
								 					 </td>
								 					 <td>
								 					 <a href="${data[rec].url}" target="_blank">${data[rec].url}</a>
								 					 </td>
								 					 <td>
								 					 ${data[rec].author}
								 					 </td>
								 					 <td>
								 					 ${data[rec].publishedAt}
								 					 </td>
								 					 <td>
								 					 ${data[rec].content}
								 					 </td>
								 					 </tr>`;
								 					 
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});

});