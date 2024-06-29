function resolveAfter2Seconds() {
  console.log('starting slow Promise');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('slow');
      console.log('slow Promise is done');
    }, 3000);
  });
}

function resolveAfter1Second() {
  console.log('starting fast promise');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fast');
      console.log('fast promise is done');
    }, 2000);
  });
}

async function sequentialStart() {
  console.log('=== sequentialStart starts ===');
  const slow = resolveAfter2Seconds();
  console.log(await slow);

  const fast = resolveAfter1Second();
  console.log(await fast);
  console.log('=== sequentialStart End ===');
}

async function sequentialWait() {
  console.log('=== sequentialWait starts ===');
  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();
  console.log(await slow);
  console.log(await fast);
  console.log('=== sequentialWait done ====');
}

async function concurrent1() {
  console.log('===concurrent1 start ===');
  const results = await Promise.all([
    resolveAfter2Seconds(),
    resolveAfter1Second(),
  ]);
  console.log(results[0]);
  console.log(results[1]);
  console.log('===concurrent1 don ===');
}

async function concurrent2() {
  console.log('=== concurrent2 start ');
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ]);
  console.log('=== concurrent2 don ');
}
//sequentialStart()
sequentialStart();
//sequentialWait()
setTimeout(sequentialWait, 6000);
//wait again
setTimeout(concurrent1, 11000);
// wait again 
setTimeout(concurrent2,16000)