async function IsAuthorized(request, userId) {
  if (userId !== request.user.id) {
    ERROR(`Unauthorized`, true);
  } else return true;
}
