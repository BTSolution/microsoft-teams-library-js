import { sharing } from '../../src/public/sharing';
import { app } from '../../src/public/app';
import { Utils } from '../utils';
import { ErrorCode } from '../../src/public/interfaces';

describe('sharing_v1', () => {

  const utils = new Utils();

  beforeEach(() => {
    utils.processMessage = null;
    utils.messages = [];
    utils.childMessages = [];
    utils.childWindow.closed = false;

    // Set a mock window for testing
    app._initialize(utils.mockWindow);
  });

  afterEach(() => {
    // Reset the object since it's a singleton
    if (app._uninitialize) {
      app._uninitialize();
    }
  });

  it('should handle share web content in success scenario', () => {
    utils.initializeWithContext('content');
    const callback = jest.fn();
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    
    let response;
    sharing.shareWebContent(shareRequest, callback);
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);

    expect(shareMessage).not.toBeNull();
    expect(shareMessage.args.length).toBe(1);
    expect(shareMessage.args[0]).toEqual(shareRequest);
    utils.respondToMessage(shareMessage);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('should handle share web content when content is missing', () => {
    utils.initializeWithContext('content');
    const shareRequest = {content: undefined};
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content is missing'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content array is empty', () => {
    utils.initializeWithContext('content');
    const shareRequest = {content: []};
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content is missing'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content type is missing', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content type cannot be undefined'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content items are of mixed types', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        },
        {
          type: 'text',
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content must be of the same type'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when url is missing in URL content type', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'URL',
          message: 'test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'URLs are required for URL content types'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content is an unsupported type', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'image',
          src: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Content type is unsupported'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when other errors occur', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM,
      message: 'Feature is not supported.'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).not.toBeNull();
    expect(shareMessage.args[0]).toEqual(shareRequest);
    utils.respondToMessage(shareMessage, error);
    expect(response).toEqual(error);
  });

  it('should handle share web content when request is null', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = null;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });

  it('should handle share web content when request is undefined', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = undefined;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });

  it('should handle share web content when request is invalid object', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = ({
      first: 1,
      second: 2,
    } as any) as sharing.IShareRequest<sharing.IURLContent>;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });
});
describe('sharing_v2', () => {

  const utils = new Utils();

  beforeEach(() => {
    utils.processMessage = null;
    utils.messages = [];
    utils.childMessages = [];
    utils.childWindow.closed = false;

    // Set a mock window for testing
    app._initialize(utils.mockWindow);
  });

  afterEach(() => {
    // Reset the object since it's a singleton
    if (app._uninitialize) {
      app._uninitialize();
    }
  });

  it('should handle share web content in success scenario', () => {
    utils.initializeWithContext('content');
    const callback = jest.fn();
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    
    let response;
    sharing.shareWebContent(shareRequest, callback);
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);

    expect(shareMessage).not.toBeNull();
    expect(shareMessage.args.length).toBe(1);
    expect(shareMessage.args[0]).toEqual(shareRequest);
    utils.respondToMessage(shareMessage);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('should handle share web content when content is missing', () => {
    utils.initializeWithContext('content');
    const shareRequest = {content: undefined};
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content is missing'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content array is empty', () => {
    utils.initializeWithContext('content');
    const shareRequest = {content: []};
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content is missing'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content type is missing', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content type cannot be undefined'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content items are of mixed types', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        },
        {
          type: 'text',
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Shared content must be of the same type'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when url is missing in URL content type', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'URL',
          message: 'test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'URLs are required for URL content types'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when content is an unsupported type', () => {
    utils.initializeWithContext('content');
    const shareRequest = {
      content: [
        {
          type: 'image',
          src: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.INVALID_ARGUMENTS,
      message: 'Content type is unsupported'
    };

    let response: any;
    sharing.shareWebContent(shareRequest as any, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
    expect(response).toEqual(error);
  });

  it('should handle share web content when other errors occur', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = {
      content: [
        {
          type: 'URL',
          url: 'https://www.microsoft.com',
          preview: true,
          message: 'Test'
        }
      ]
    };
    const error = {
      errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM,
      message: 'Feature is not supported.'
    };

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).not.toBeNull();
    expect(shareMessage.args[0]).toEqual(shareRequest);
    utils.respondToMessage(shareMessage, error);
    expect(response).toEqual(error);
  });

  it('should handle share web content when request is null', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = null;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });

  it('should handle share web content when request is undefined', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = undefined;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });

  it('should handle share web content when request is invalid object', () => {
    utils.initializeWithContext('content');
    const shareRequest: sharing.IShareRequest<sharing.IURLContent> = ({
      first: 1,
      second: 2,
    } as any) as sharing.IShareRequest<sharing.IURLContent>;

    let response: any;
    sharing.shareWebContent(shareRequest, (res) => {
      response = res;
    });
    const shareMessage = utils.findMessageByFunc(sharing.SharingAPIMessages.shareWebContent);
    expect(shareMessage).toBeNull();
  });
});