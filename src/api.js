// TODO: async await

export const fetchInfo = (identifier, callback) => {
  const xmlhttp = new XMLHttpRequest();

  const url = `https://archive.org/metadata/${identifier}`;

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      return callback(this);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

};


export const fetchRelatedInfo = (identifier, callback) => {
  const xmlhttp = new XMLHttpRequest();
  const url = `https://be-api.us.archive.org/mds/v1/get_related/all/${identifier}`;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      return callback(this);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

};

