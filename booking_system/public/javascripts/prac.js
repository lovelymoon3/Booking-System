function search(){
    var search = {
        size : document.getElementById("size").value,
        rating : document.getElementById("rating").value,
        // facility : document.getElementById("facility").value,
        // check_in : document.getElementById("check_in").value,
        // check_out : document.getElementById("check_out").value
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

      var result = document.getElementById("result");

      var list = JSON.parse(this.responseText);
      //console.log(list);


      for (i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        var Id = document.createElement('th');
        var Size = document.createElement('th');
        var Rating = document.createElement('th');
        Id.innerText = list[i].room_id;
        Size.innerText = list[i].size;
        Rating.innerText = list[i].rating;
        row.appendChild(Id);
        row.appendChild(Size);
        row.appendChild(Rating);
        result.appendChild(row);

      }
      }

    };
    xhttp.open("POST","/search_shoes", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(search));
}