const jobs = {};
const botPrefix = process.env.BOT_PREFIX;

const jobTimeout = 60 * 1000; // 1 minute

const randomConfirmCode = () => {
  let code;
  do {
    code = String(Math.random()).substring(2, 7);
  } while (jobs[code]);
  return code;
};

const confirmMessage = (command, code) => {
  return `\`${command}\` need confirmation, type \`${botPrefix}confirm ${code}\` (expires 1m)`;
};

const removeJob = code => {
  if (jobs[code]) {
    delete jobs[code];
  }
};

const addJob = job => {
  const code = randomConfirmCode();
  jobs[code] = job;

  setTimeout(() => {
    removeJob(code);
  }, jobTimeout);

  return code;
};

const needsConfirmation = (command, job, channel) => {
  const code = addJob(job);
  channel.send(confirmMessage(command, code));
  return code;
};

const confirm = code => {
  const job = jobs[code];
  if (job) {
    job();
    delete jobs[code];
    return true;
  }
  return false;
};

module.exports = {confirm, needsConfirmation};
