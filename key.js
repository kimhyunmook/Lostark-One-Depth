const outputview = document.querySelector(".output-view");
const key =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NzcwNDEifQ.G2QMUj9SrqvYpowvmYe5EZsVdWTqiK_V8RPOUfD9SfBtQc3VVkeynvmhj6zUZL21aD8OWoeNySPRZzG62QtDt4-YUgkLrseShA8P59TIBqi4qU7mhmnXbmygdk1DjPVzNZNhIISjFNL8rLNKoYNeDGlpp8_dFQvTj919G7-JJ8KPdxJnEW-lxdHqRPsUQ4TPmFXNRIxbY6PBIyJQjAsTtYh7GvL9KHR_xKV2c5jVRdCPp4Ekiqqi1LBSTCeYsPkoMM3Dt-UEThF6h75tRWfWdiXf6_KyrR_Bm2SwolMZvUboQsX7NK-4eGjVyLjDitDOC3uRzDCuJc4zykFunGU-nA";
const headers = {
  accept: "application/json",
  authorization: "bearer " + key,
};

export default {
  url: "https://developer-lostark.game.onstove.com",
  key,
  outputview,
  headers,
};
