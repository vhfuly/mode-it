import axios from 'axios';

export default function login(request, response) {

  const { code } = request.query
  axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, 
  {headers:{
    'content-type': 'application/json',
  },
  responseType: 'json',})
  .then(res => {
    const token = res.data.substring(13, 53);
    axios.get('https://api.github.com/user', { headers:{Authorization:  `bearer ${token}` }}  )
    .then(res => console.log(res))
    .catch(err => console.log(response.redirect('/login')))
  });
  response.redirect('/')
};

