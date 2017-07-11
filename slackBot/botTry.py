from slackclient import SlackClient
import time
slack_client = SlackClient('#######')
slack_client.api_call("auth.test")

def list_channels():
    channels_call = slack_client.api_call("channels.list")
    if channels_call.get('ok'):
        return channels_call['channels']
    return None

def userIM():
    users = []
    usersim = slack_client.api_call("im.list")
    if usersim.get("ok"):
        num = len(usersim['ims'])
        for i in range(num):
            users.append(usersim['ims'][i]['user'])
    return users
 
def send_message(channel_id, message):
    slack_client.api_call(
        "chat.postMessage",
        channel=channel_id,
        text=message,
        username='spacebot2',
        as_user=True,
        icon_emoji=':robot_face:'
    )

def join_channel(channel_id):
    slack_client.api_call("channels.join",channel=channel_id)

channels = list_channels()
# if channels:
#     print("Channels: ")
#     for c in channels:
#         print(c['name'] + " (" + c['id'] + ")")
#         if c['name'] == "tes":
#             print("write message")
#             data = input()
#             join_channel(c['name'])
#             send_message(c['id'], data)
#     else:
#         print("Unable to authenticate.")

# users = userIM()
# print(users)

# if users:
#     print("user ids:")
#     for u in users:
#         send_message(u,"hello this is a test")



if slack_client.rtm_connect():
    READ_WEBSOCKET_DELAY = 1
    command, channel = parse_slack_output(slack_client.rtm_read())
    if command and channel:
    
    time.sleep(READ_WEBSOCKET_DELAY)