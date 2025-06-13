import { Button, Card, CardBody, CardHeader, Avatar, Chip } from "@nextui-org/react"
import { Bell, Settings, ShoppingBag, Clock, Star, MapPin, Heart, CreditCard } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Welcome back, John</h1>
            <p className="text-neutral-400 text-lg font-light">Ready for your next delicious order?</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              isIconOnly
              variant="bordered"
              className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] h-10 w-10"
              radius="lg"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="bordered"
              className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] h-10 w-10"
              radius="lg"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar
              size="sm"
              src="/placeholder.svg?height=40&width=40"
              fallback="JD"
              classNames={{
                base: "bg-white text-black font-normal",
                fallback: "text-black font-normal",
              }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h4 className="text-sm font-light text-neutral-300">Total Orders</h4>
              <ShoppingBag className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardBody className="pt-0">
              <div className="text-2xl font-light text-white">47</div>
              <p className="text-xs text-neutral-500 font-light">Since joining</p>
            </CardBody>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h4 className="text-sm font-light text-neutral-300">Avg Delivery</h4>
              <Clock className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardBody className="pt-0">
              <div className="text-2xl font-light text-white">23m</div>
              <p className="text-xs text-neutral-500 font-light">Average time</p>
            </CardBody>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h4 className="text-sm font-light text-neutral-300">Rewards Points</h4>
              <Star className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardBody className="pt-0">
              <div className="text-2xl font-light text-white">1,240</div>
              <p className="text-xs text-neutral-500 font-light">Available to use</p>
            </CardBody>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h4 className="text-sm font-light text-neutral-300">Saved</h4>
              <Heart className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardBody className="pt-0">
              <div className="text-2xl font-light text-white">$127</div>
              <p className="text-xs text-neutral-500 font-light">With rewards</p>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader>
              <div>
                <h4 className="text-white font-light">Recent Orders</h4>
                <p className="text-neutral-400 font-light text-sm">Your latest Pizzify orders</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/[0.08] rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-light">Margherita Classic + Garlic Bread</p>
                  <p className="text-sm text-neutral-500 font-light">Delivered • 2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-light">$24.99</p>
                  <Chip size="sm" className="bg-green-500/20 text-green-400 border-green-500/30 font-light">
                    Delivered
                  </Chip>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/[0.08] rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-light">Pepperoni Supreme + Caesar Salad</p>
                  <p className="text-sm text-neutral-500 font-light">Delivered • 1 week ago</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-light">$31.50</p>
                  <Chip size="sm" className="bg-green-500/20 text-green-400 border-green-500/30 font-light">
                    Delivered
                  </Chip>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/[0.08] rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-light">Quattro Stagioni + Tiramisu</p>
                  <p className="text-sm text-neutral-500 font-light">Delivered • 2 weeks ago</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-light">$28.75</p>
                  <Chip size="sm" className="bg-green-500/20 text-green-400 border-green-500/30 font-light">
                    Delivered
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader>
              <div>
                <h4 className="text-white font-light">Quick Actions</h4>
                <p className="text-neutral-400 font-light text-sm">What would you like to do?</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-neutral-200 font-normal h-10" radius="lg">
                Order Again
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] font-light h-10"
                radius="lg"
                startContent={<MapPin className="h-4 w-4" />}
              >
                Update Address
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] font-light h-10"
                radius="lg"
                startContent={<CreditCard className="h-4 w-4" />}
              >
                Payment Methods
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] font-light h-10"
                radius="lg"
                startContent={<Heart className="h-4 w-4" />}
              >
                Favorites
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.04] font-light h-10"
                radius="lg"
              >
                Sign Out
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Favorites Section */}
        <div className="mt-12">
          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl">
            <CardHeader>
              <div>
                <h4 className="text-white font-light">Your Favorites</h4>
                <p className="text-neutral-400 font-light text-sm">Quick reorder your most loved items</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/[0.02] border-white/[0.08]">
                  <CardBody className="p-4">
                    <div className="w-full h-32 bg-white/[0.08] rounded-lg mb-4"></div>
                    <h4 className="text-white font-light mb-2">Margherita Classic</h4>
                    <p className="text-sm text-neutral-400 font-light mb-3">Fresh mozzarella, basil, tomato sauce</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-light">$18.99</span>
                      <Button size="sm" className="bg-white text-black hover:bg-neutral-200 font-normal" radius="lg">
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/[0.02] border-white/[0.08]">
                  <CardBody className="p-4">
                    <div className="w-full h-32 bg-white/[0.08] rounded-lg mb-4"></div>
                    <h4 className="text-white font-light mb-2">Pepperoni Supreme</h4>
                    <p className="text-sm text-neutral-400 font-light mb-3">Premium pepperoni, mozzarella, herbs</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-light">$22.99</span>
                      <Button size="sm" className="bg-white text-black hover:bg-neutral-200 font-normal" radius="lg">
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/[0.02] border-white/[0.08]">
                  <CardBody className="p-4">
                    <div className="w-full h-32 bg-white/[0.08] rounded-lg mb-4"></div>
                    <h4 className="text-white font-light mb-2">Quattro Stagioni</h4>
                    <p className="text-sm text-neutral-400 font-light mb-3">Four seasons with premium toppings</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-light">$26.99</span>
                      <Button size="sm" className="bg-white text-black hover:bg-neutral-200 font-normal" radius="lg">
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
