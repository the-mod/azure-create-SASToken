const iothub = require('azure-iothub');
const deviceSas = require('azure-iot-device').SharedAccessSignature;

// kudos to https://github.com/kvaes/TasmanianTraders-IoT-ConnectedVehicle-Functions/blob/master/getSASTokenByDeviceID/index.js
const getSAS = function () {
    const connectionString = "of the iot hub";
    const iothubHost = "<your host>.azure-devices.net";
    const deviceId = "";

    const registry = iothub.Registry.fromConnectionString(connectionString);
    registry.get(deviceId, (err, getDevDesc) => {
        const deviceKey = getDevDesc.authentication.symmetricKey.primaryKey;
        const expiry = Math.ceil((Date.now() / 1000) + 60 * 60 * 24); //24h
        const sasTokenDevice = deviceSas.create(iothubHost, deviceId, deviceKey, expiry).toString();
        // HostName=iothubname.azure-devices.net;DeviceId=deviceid;SharedAccessKey=SasKey
        console.log(sasTokenDevice);
    });
};

getSAS();