import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentLevel] = useState(5);
  const [currentPoints] = useState(2750);
  const [notifications, setNotifications] = useState(true);
  
  // Формула расчета очков для уровня
  const calculateLevelPoints = (level: number): number => {
    if (level === 1) return 700;
    return calculateLevelPoints(level - 1) + (level * 500) + 200 * (level - 1);
  };
  
  const nextLevelPoints = calculateLevelPoints(currentLevel + 1);
  const currentLevelPoints = calculateLevelPoints(currentLevel);
  const progressPercent = ((currentPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  const pointsToNext = nextLevelPoints - currentPoints;

  const stats = [
    { label: 'Билды', value: '24', icon: 'Code' },
    { label: 'Подписчики', value: '1.2К', icon: 'Users' },
    { label: 'Просмотры', value: '15.3К', icon: 'Eye' },
    { label: 'Лайки', value: '892', icon: 'Heart' }
  ];

  const builds = [
    { id: 1, name: 'Интернет-магазин', views: 1240, likes: 89, date: '2024-08-01' },
    { id: 2, name: 'Лендинг SaaS', views: 856, likes: 124, date: '2024-08-03' },
    { id: 3, name: 'Портфолио дизайнера', views: 2100, likes: 156, date: '2024-08-05' }
  ];

  const shopItems = [
    { id: 1, name: 'Космический фон', price: 500, category: 'Фоны' },
    { id: 2, name: 'Золотая рамка', price: 800, category: 'Рамки' },
    { id: 3, name: 'Буст опыта x2', price: 1200, category: 'Бусты' },
    { id: 4, name: 'Неоновый баннер', price: 600, category: 'Баннеры' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Профиль Header */}
        <Card className="mb-6 overflow-hidden animate-fade-in">
          <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative">
            <img 
              src="/img/9d021407-4a96-460d-a13a-4f33ebf7b722.jpg" 
              alt="Banner" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80" />
          </div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                <AvatarImage src="/img/556d5468-c95e-4672-a55f-c8454338b8c0.jpg" />
                <AvatarFallback>ЮР</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white md:text-foreground">Юрий Космонавт</h1>
                    <p className="text-blue-100 md:text-muted-foreground">Фулстек-разработчик • poehali.dev</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Icon name="Star" size={14} />
                      Уровень {currentLevel}
                    </Badge>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Онлайн</span>
                  </div>
                </div>
                
                {/* Прогресс уровня */}
                <div className="bg-white/10 md:bg-muted/50 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white md:text-foreground">
                      Прогресс до {currentLevel + 1} уровня
                    </span>
                    <span className="text-sm text-blue-100 md:text-muted-foreground">
                      {pointsToNext} очков до повышения
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-blue-200 md:text-muted-foreground">
                      {currentPoints} / {nextLevelPoints}
                    </span>
                    <span className="text-xs font-medium text-yellow-400 md:text-yellow-600">
                      ⭐ {currentPoints} очков
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </Button>
                <Button size="sm">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="animate-scale-in hover:shadow-lg transition-all duration-200" 
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={stat.icon as any} size={20} className="text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Основной контент */}
        <Tabs defaultValue="builds" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="builds">Билды</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="shop">Магазин</TabsTrigger>
          </TabsList>

          <TabsContent value="builds" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Мои билды</h2>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать билд
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {builds.map((build) => (
                <Card key={build.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-md mb-3 flex items-center justify-center">
                      <Icon name="Code" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-base">{build.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {build.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Heart" size={14} />
                        {build.likes}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="BarChart3" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки профиля</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" defaultValue="Юрий Космонавт" />
                  </div>
                  <div>
                    <Label htmlFor="position">Должность</Label>
                    <Input id="position" defaultValue="Фулстек-разработчик" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Input id="bio" defaultValue="Создаю космические веб-приложения 🚀" />
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">Социальные сети</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Github" size={20} />
                        <span>GitHub</span>
                      </div>
                      <Button variant="outline" size="sm">Подключить</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="MessageCircle" size={20} />
                        <span>Discord</span>
                      </div>
                      <Button variant="outline" size="sm">Подключить</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email-уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-medium">Последние уведомления</h4>
                  {[
                    { text: 'Новый лайк на билд "Интернет-магазин"', time: '2 мин назад', type: 'like' },
                    { text: 'Комментарий к проекту "Лендинг SaaS"', time: '1 час назад', type: 'comment' },
                    { text: 'Достижение: 1000 просмотров!', time: '3 часа назад', type: 'achievement' }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-1 bg-primary/10 rounded">
                        <Icon name={notification.type === 'like' ? 'Heart' : notification.type === 'comment' ? 'MessageCircle' : 'Award'} 
                              size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.text}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность аккаунта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Смена пароля</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Текущий пароль" />
                    <Input type="password" placeholder="Новый пароль" />
                    <Input type="password" placeholder="Подтвердите новый пароль" />
                    <Button>Обновить пароль</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">Двухфакторная аутентификация</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Дополнительная защита аккаунта</p>
                      <p className="text-xs text-muted-foreground">Рекомендуется для повышения безопасности</p>
                    </div>
                    <Button variant="outline">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Настроить 2FA
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">Активные сессии</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Текущая сессия</p>
                        <p className="text-xs text-muted-foreground">Chrome • Москва • 192.168.1.1</p>
                      </div>
                      <Badge variant="secondary">Активна</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3">
                    Завершить все сессии
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Магазин очков</h2>
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={20} className="text-yellow-500" />
                <span className="font-semibold text-lg">{currentPoints}</span>
                <span className="text-muted-foreground">очков</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-md mb-3 flex items-center justify-center">
                      <Icon name="Package" size={32} className="text-yellow-600" />
                    </div>
                    <Badge variant="outline" className="w-fit">{item.category}</Badge>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Icon name="Coins" size={16} className="text-yellow-500" />
                        <span className="font-semibold">{item.price}</span>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={currentPoints < item.price}
                        variant={currentPoints >= item.price ? "default" : "secondary"}
                      >
                        {currentPoints >= item.price ? "Купить" : "Недостаточно"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-primary/20">
              <CardContent className="p-6 text-center">
                <Icon name="Info" size={24} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Как получить больше очков?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Создавайте билды, получайте лайки и комментарии, участвуйте в сообществе
                </p>
                <Button variant="outline">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Узнать подробнее
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;