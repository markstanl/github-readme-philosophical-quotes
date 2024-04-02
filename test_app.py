import unittest
from app import app


class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_generate_default_image(self):
        response = self.app.get('/generate_image')
        self.assertEqual(200, response.status_code)

    def test_generate_image_with_author(self):
        response_1 = self.app.get('/generate_image?author=Peter Singer')
        self.assertEqual(200, response_1.status_code)  # case sensitive
        response_2 = self.app.get('/generate_image?author=pETER sINGER')
        self.assertEqual(200, response_2.status_code)  # case insensitive
        response_3 = self.app.get('/generate_image?author=Peter')
        self.assertEqual(404, response_3.status_code)  # author not found

    def test_generate_image_with_theme(self):
        response_1 = self.app.get('/generate_image?theme=dark')
        self.assertEqual(200, response_1.status_code)
        response_2 = self.app.get('/generate_image?theme=fake color')
        self.assertEqual(422, response_2.status_code)

    def test_generate_image_with_daily_quote(self):
        response_1 = self.app.get('/generate_image?daily_quote=true')
        self.assertEqual(200, response_1.status_code)  # expect a successful response
        response_2 = self.app.get('/generate_image?daily_quote=1')
        self.assertEqual(response_1.data, response_2.data)  # expect the same output

    def test_generate_image_with_specific_quote(self):
        response_1 = self.app.get('/generate_image?quote="I think, therefore I am.')
        self.assertEqual(200, response_1.status_code)
        response_2 = self.app.get('/generate_image?quote="I think, therefore I am not')
        self.assertEqual(404, response_2.status_code)
        response_3 = self.app.get('/generate_image?quote="The')
        self.assertEqual(404, response_3.status_code)

    def test_generate_image_with_specific_quote_index(self):
        response_1 = self.app.get('/generate_image?quote_index=0')
        self.assertEqual(200, response_1.status_code)
        response_2 = self.app.get('/generate_image?quote_index=100')
        self.assertEqual(400, response_2.status_code)
        response_3 = self.app.get('/generate_image?quote_index=-1')
        self.assertEqual(400, response_3.status_code)

    def test_generate_image_with_multiple_mutually_exclusive_parameters(self):
        response_1 = self.app.get('/generate_image?quote_index=0&author=Peter Singer')
        self.assertEqual(400, response_1.status_code)
        response_2 = self.app.get('/generate_image?quote="I think, therefore I am"&daily_quote=true')
        self.assertEqual(400, response_2.status_code)

    def test_generate_image_with_multiple_parameters(self):
        response_1 = self.app.get('/generate_image?quote="I think, therefore I am."&theme=dark')
        self.assertEqual(200, response_1.status_code)
        response_4 = self.app.get('/generate_image?theme=dark&daily_quote=true')
        self.assertEqual(200, response_4.status_code)
        response_5 = self.app.get('/generate_image?theme=dark&author=Peter Singer')
        self.assertEqual(200, response_5.status_code)
        response_6 = self.app.get('/generate_image?author=Peter Singer&daily_quote=true')
        self.assertEqual(200, response_6.status_code)


if __name__ == '__main__':
    unittest.main()