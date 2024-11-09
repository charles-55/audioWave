async function checkMicrophonePermission() {
  try {
    // Check permission status for microphone
    const permissionStatus = await navigator.permissions.query({ name: 'microphone' });

    // Check the state of the permission
    if (permissionStatus.state === 'granted') {
      console.log('Microphone access granted!');
    } else if (permissionStatus.state === 'prompt') {
      console.log('Microphone permission is pending!');
      requestMicrophoneAccess();
    } else {
      console.log('Microphone access denied!');
      console.log(permissionStatus.state)
    }
  } catch (err) {
    console.error('Error checking microphone permission:', err);
  }
}

async function requestMicrophoneAccess() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log('Microphone access granted');
  } catch (err) {
    console.error('Microphone access denied: ', err);
  }
}
