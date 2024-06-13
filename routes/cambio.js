fs.readFile('./public/html/Home.html', function (err, html) {

  if (err) {

      throw err;

  }     

  else {

     res.writeHeader(200, {"Content-Type": "text/html"}); 

      res.write(html); 

      res.end(); 

  }

}); 
