import httpx


class ApiAgent():
    def __init__(self, access_token, user_id, v="5.199"):
        self.access_token = access_token
        self.user_id = user_id
        self.v = v

    async def get_groups(self):
        url = f"https://api.vk.ru/method/groups.get?user_id={self.user_id}&extended=1&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        if response.json():
            groups = response.json().get("response").get("items")
        else:
            groups = None
        return groups

    async def get_wall(self, id, count=5):
        url = f"https://api.vk.ru/method/wall.get?owner_id=-{id}&count={count}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        if response.json().get("response") is not None:
            print(response.json())
            print(response.json().get("response"))
            post_ids = response.json().get("response").get("items")
        else:
            post_ids = None
        return post_ids

    async def get_profile_info(self):
        url = f"https://api.vk.ru/method/account.getProfileInfo?user_id={self.user_id}&access_token={self.access_token}&v={self.v}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        comments_ids = response.json().get("response")
        return comments_ids
