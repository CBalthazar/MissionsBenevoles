class BaseException extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

class IncompleteReqException extends BaseException {
  constructor(message) {
    super(400, message);
  }
}

class RoleException extends BaseException {
  constructor(message) {
    super(401, message);
  }
}

export { IncompleteReqException, RoleException };
