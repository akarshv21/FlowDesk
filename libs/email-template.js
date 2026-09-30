const createFlowdeskEmail = ({
  title,
  message,
  buttonText,
  buttonUrl,
  fallbackText = "If the button above doesn't work, copy and paste this link into your browser:",
  footerText = "You’re receiving this email because of an action on your Flowdesk account.",
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${title}</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f6f8fc;
    font-family: Arial, Helvetica, sans-serif;
    color: #0f172a;
  "
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="width: 100%; margin: 0; padding: 0; background-color: #f6f8fc;"
  >
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width: 100%;
            max-width: 560px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            overflow: hidden;
          "
        >
          <!-- Header -->
          <tr>
            <td
              style="
                padding: 28px 32px 24px;
                border-bottom: 1px solid #eef0f4;
              "
            >
              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <div
                     style="
                       width:40px;
                       height:40px;
                       border-radius:12px;
                       background:#2563eb;
                       display:inline-flex;
                       align-items:center;
                       justify-content:center;">
                      <div
                         style="
                         position:relative;
                         width:20px;
                          height:20px;">
                   <div
                     style="
                         position:absolute;
                         left:1px;
                         top:1px;
                         width:9px;
                         height:9px;
                         border:2px solid #ffffff;
                         border-radius:3px;
                         box-sizing:border-box;">
                      </div>

                        <div
                            style="
                              position:absolute;
                              right:1px;
                              bottom:1px;
                              width:9px;
                              height:9px;
                              border:2px solid #ffffff;
                              border-radius:3px;
                              box-sizing:border-box;">
                          </div>

                          <div
                               style="
                                position:absolute;
                                left:7px;
                                top:7px;
                               width:6px;
                                 height:6px;
                                border-radius:2px;
                                background:#ffffff;">
                          </div>
                        </div>
                   </div>
                    <div
                      style="
                        position: relative;
                        width: 16px;
                        height: 16px;
                        margin: 0 auto;
                      "
                    >
                      <span
                        style="
                          position: absolute;
                          left: 0;
                          top: 0;
                          width: 7px;
                          height: 7px;
                          border: 2px solid #ffffff;
                          border-radius: 3px;
                        "
                      ></span>

                      <span
                        style="
                          position: absolute;
                          right: 0;
                          bottom: 0;
                          width: 7px;
                          height: 7px;
                          border: 2px solid #ffffff;
                          border-radius: 3px;
                        "
                      ></span>

                      <span
                        style="
                          position: absolute;
                          left: 5px;
                          top: 5px;
                          width: 6px;
                          height: 6px;
                          background-color: #ffffff;
                          border-radius: 50%;
                        "
                      ></span>
                    </div>
                  </td>

                  <td style="padding-left: 12px;">
                    <div
                      style="
                        font-size: 18px;
                        line-height: 20px;
                        font-weight: 700;
                        letter-spacing: -0.5px;
                        color: #0f172a;
                      "
                    >
                      Flowdesk
                    </div>

                    <div
                      style="
                        margin-top: 4px;
                        font-size: 9px;
                        line-height: 12px;
                        font-weight: 600;
                        letter-spacing: 1.5px;
                        text-transform: uppercase;
                        color: #94a3b8;
                      "
                    >
                      Turn work into flow.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px 36px;">
              <h1
                style="
                  margin: 0;
                  font-size: 28px;
                  line-height: 36px;
                  font-weight: 700;
                  letter-spacing: -0.7px;
                  color: #0f172a;
                "
              >
                ${title}
              </h1>

              <p
                style="
                  margin: 16px 0 0;
                  font-size: 15px;
                  line-height: 24px;
                  color: #64748b;
                "
              >
                ${message}
              </p>

              <!-- CTA -->
              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="margin-top: 30px;"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #2563eb;
                      border-radius: 10px;
                    "
                  >
                    <a
                      href="${buttonUrl}"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 13px 22px;
                        font-size: 14px;
                        line-height: 20px;
                        font-weight: 600;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 10px;
                      "
                    >
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback -->
              <p
                style="
                  margin: 30px 0 0;
                  font-size: 12px;
                  line-height: 19px;
                  color: #94a3b8;
                "
              >
                ${fallbackText}
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  font-size: 12px;
                  line-height: 19px;
                  word-break: break-all;
                "
              >
                <a
                  href="${buttonUrl}"
                  target="_blank"
                  style="
                    color: #2563eb;
                    text-decoration: none;
                  "
                >
                  ${buttonUrl}
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 22px 32px;
                background-color: #fafbfc;
                border-top: 1px solid #eef0f4;
              "
            >
              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  line-height: 18px;
                  color: #94a3b8;
                "
              >
                ${footerText}
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  font-size: 11px;
                  line-height: 18px;
                  color: #cbd5e1;
                "
              >
                © Flowdesk · Turn work into flow.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export default createFlowdeskEmail; 