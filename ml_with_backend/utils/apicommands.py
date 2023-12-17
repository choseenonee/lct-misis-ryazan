import httpx


class ApiAgent:
    def __init__(self, access_token, user_id, v="5.199"):
        self.access_token = access_token
        self.user_id = user_id
        self.v = v

    async def get_groups(self):
        url = f"https://api.vk.ru/method/groups.get?user_id={self.user_id}&extended=1&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        groups = response.json().get("response").get("items")
        return groups

    async def get_wall(self, id, count=5):
        url = f"https://api.vk.ru/method/wall.get?owner_id={id}&count={count}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        post_ids = response.json().get("response").get("items")
        return post_ids

    async def get_comments(self, count=5):
        url = f"https://api.vk.ru/method/wall.getComments?owner_id={self.user_id}&count={count}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        comments_ids = response.json().get("response")
        return comments_ids

    async def get_comment(self, comment_id, count=5):
        url = f"https://api.vk.ru/method/wall.getComment?owner_id={self.user_id}&comment_id={comment_id}&count={count}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        comments_ids = response.json().get("response").get("items")
        return comments_ids

    async def get_profileInfo(self, count=5):
        url = f"https://api.vk.ru/method/account.getProfileInfo?user_id={self.user_id}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        comments_ids = response.json().get("response")
        return comments_ids


