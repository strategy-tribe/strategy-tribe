async function IsAuthorized(request, userId, errorMsg = 'Unauthorized') {
  if (userId !== request.user.id) {
    ERROR(errorMsg, true);
  } else return true;
}
