let socket;
let user;

let dataArray;
let roll;
let pitch;
let direction;

const connectSocket = (e) => {
  socket = io.connect();


  socket.on('connect', () => {
    console.log('connected to server');
    if (!user) {
      user = 'mobileClient';
    }

    socket.emit('join', { name: user, type: 'dataSource' });
  });
};

const init = () => {
  console.log('init');
  connectSocket();
    // Check to make sure the browser supprots DeviceOrientationEvents
    if (window.DeviceOrientationEvent) {
    // Create an event listener
    window.addEventListener('deviceorientation', function(event) {
    // Get the left-to-right tilt (in degrees).
     roll = event.gamma;

    // Get the front-to-back tilt (in degrees).
     pitch = event.beta;

      // Get the direction of the device (in degrees).
     direction = event.alpha;

    console.log(`Tilt Left/Right: ${roll} Tilt Forward/Back: ${pitch} Direction: ${direction}`);
    sendData();
    updateUI();
  });
}
};

const sendData = () => {

  let data = new Float32Array(3);
  data[0] = roll;
  data[1] = pitch;
  data[2] = direction;

  let dataPacket = {
	dateCreated: Date.now,
	buffer: data,
	name: user,
	};

    socket.emit('mobileIMUData', dataPacket, function (response) {
		console.log(response);
	});
	// console.log(`Data sent over socket to ${serverURL}: ${dataPacket}`);
};

const updateUI = () => {
  console.log(`Pitch: ${pitch}`);
  console.log(`Roll: ${roll}`);
  $('#pitch').text(`Pitch: ${pitch}`);
  $('#roll').text(`Roll: ${roll}`);
  $('#direction').text(`Direction: ${direction}`);
};


window.onload = init;
