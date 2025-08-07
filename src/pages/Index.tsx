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
  
  // Формула расчета очков для уровня: Очки уровня N = Очки уровня (N-1) + (N × 500) + 200 × (N-1)
  const calculateLevelPoints = (level: number): number => {
    if (level === 1) return 700;
    return calculateLevelPoints(level - 1) + (level * 500) + 200 * (level - 1);
  };
  
  const nextLevelPoints = calculateLevelPoints(currentLevel + 1);
  const currentLevelPoints = calculateLevelPoints(currentLevel);
  const progressPercent = ((currentPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  const pointsToNext = nextLevelPoints - currentPoints;

  const stats = [
    { label: 'Билды', value: '24', icon: 'Code', trend: '+2' },
    { label: 'Подписчики', value: '1.2К', icon: 'Users', trend: '+45' },
    { label: 'Просмотры', value: '15.3К', icon: 'Eye', trend: '+1.2К' },
    { label: 'Лайки', value: '892', icon: 'Heart', trend: '+67' }
  ];

  const builds = [
    { id: 1, name: 'Интернет-магазин', views: 1240, likes: 89, date: '2024-08-01', status: 'published' },
    { id: 2, name: 'Лендинг SaaS', views: 856, likes: 124, date: '2024-08-03', status: 'draft' },
    { id: 3, name: 'Портфолио дизайнера', views: 2100, likes: 156, date: '2024-08-05', status: 'published' }
  ];

  const shopItems = [
    { id: 1, name: 'Космический фон', price: 500, category: 'Фоны', rarity: 'rare' },
    { id: 2, name: 'Золотая рамка', price: 800, category: 'Рамки', rarity: 'epic' },
    { id: 3, name: 'Буст опыта x2', price: 1200, category: 'Бусты', rarity: 'legendary' },
    { id: 4, name: 'Неоновый баннер', price: 600, category: 'Баннеры', rarity: 'rare' }
  ];

  const activityData = [
    { day: 'Пн', commits: 12, builds: 2 },
    { day: 'Вт', commits: 8, builds: 1 },
    { day: 'Ср', commits: 15, builds: 3 },
    { day: 'Чт', commits: 22, builds: 4 },
    { day: 'Пт', commits: 18, builds: 2 },
    { day: 'Сб', commits: 5, builds: 1 },
    { day: 'Вс', commits: 3, builds: 0 }
  ];

  const maxActivity = Math.max(...activityData.map(d => d.commits));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Профиль Header */}
        <Card className="mb-8 overflow-hidden animate-fade-in border-0 shadow-sm">
          <div className="h-40 bg-gradient-to-r from-primary via-primary/90 to-primary/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-white/10" />
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/80 font-medium">Онлайн</span>
            </div>
          </div>
          
          <CardContent className="relative -mt-20 pb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
              <Avatar className="w-28 h-28 border-4 border-white shadow-xl ring-4 ring-primary/20">
                <AvatarImage src="/img/556d5468-c95e-4672-a55f-c8454338b8c0.jpg" />
                <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">ЮК</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 w-full">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Юрий Космонавт</h1>
                    <p className="text-muted-foreground text-lg mb-3">Фулстек-разработчик • poehali.dev</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                        <Icon name="Star" size={16} className="text-yellow-500" />
                        Уровень {currentLevel}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-2">
                        <Icon name="Zap" size={14} />
                        ⭐ {currentPoints} очков
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-lg">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настройки
                    </Button>
                    <Button className="rounded-lg">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  </div>
                </div>
                
                {/* Прогресс уровня */}
                <Card className="bg-muted/30 border-0">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-foreground">
                        Прогресс до {currentLevel + 1} уровня
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {pointsToNext} очков до повышения
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-3 mb-3" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {currentPoints} / {nextLevelPoints}
                      </span>
                      <span className="font-medium text-primary">
                        {Math.round(progressPercent)}% завершено
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="animate-scale-in hover:shadow-md transition-all duration-300 border-0 shadow-sm group" 
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name={stat.icon as any} size={28} className="text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="flex items-center justify-center gap-1">
                  <Icon name="TrendingUp" size={12} className="text-green-500" />
                  <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* График активности */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Activity" size={20} />
              Активность за неделю
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end h-32 gap-2">
              {activityData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: '80px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
                      style={{ 
                        height: `${(data.commits / maxActivity) * 100}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                    <div className="absolute inset-0 flex items-end justify-center pb-1">
                      <span className="text-xs font-medium text-white/90">{data.commits}</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">{data.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Основной контент */}
        <Tabs defaultValue="builds" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-muted/50 h-14 rounded-2xl p-2">
            <TabsTrigger value="builds" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl font-medium">
              Билды
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl font-medium">
              Профиль
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl font-medium">
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl font-medium">
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl font-medium">
              Магазин
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builds" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Мои билды</h2>
                <p className="text-muted-foreground">Управляйте своими проектами и отслеживайте их производительность</p>
              </div>
              <Button className="rounded-xl">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать билд
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {builds.map((build) => (
                <Card key={build.id} className="hover:shadow-md transition-all duration-300 border-0 shadow-sm group">
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                      <Icon name="Code" size={40} className="text-primary z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/10" />
                    </div>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                        {build.name}
                      </CardTitle>
                      <Badge variant={build.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                        {build.status === 'published' ? 'Опубликован' : 'Черновик'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {build.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Heart" size={14} className="text-red-500" />
                        {build.likes}
                      </span>
                      <span className="text-xs">
                        {new Date(build.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Icon name="BarChart3" size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Icon name="Share2" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Настройки профиля
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">Имя</Label>
                    <Input id="name" defaultValue="Юрий Космонавт" className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-sm font-medium mb-2 block">Должность</Label>
                    <Input id="position" defaultValue="Фулстек-разработчик" className="rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium mb-2 block">О себе</Label>
                  <Input id="bio" defaultValue="Создаю космические веб-приложения 🚀" className="rounded-xl" />
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Link" size={18} />
                    Социальные сети
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'GitHub', icon: 'Github', connected: true },
                      { name: 'Discord', icon: 'MessageCircle', connected: false },
                      { name: 'Telegram', icon: 'Send', connected: false }
                    ].map((social) => (
                      <div key={social.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Icon name={social.icon as any} size={20} className="text-muted-foreground" />
                          <span className="font-medium">{social.name}</span>
                          {social.connected && (
                            <Badge variant="secondary" className="text-xs">Подключено</Badge>
                          )}
                        </div>
                        <Button variant={social.connected ? "outline" : "default"} size="sm" className="rounded-lg">
                          {social.connected ? 'Отключить' : 'Подключить'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={20} />
                  Настройки уведомлений
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email-уведомления</Label>
                    <p className="text-sm text-muted-foreground mt-1">Получать уведомления на почту</p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="Clock" size={18} />
                    Последние уведомления
                  </h4>
                  {[
                    { text: 'Новый лайк на билд "Интернет-магазин"', time: '2 мин назад', type: 'like' },
                    { text: 'Комментарий к проекту "Лендинг SaaS"', time: '1 час назад', type: 'comment' },
                    { text: 'Достижение: 1000 просмотров!', time: '3 часа назад', type: 'achievement' },
                    { text: 'Новый подписчик: @alex_dev', time: '5 часов назад', type: 'follow' }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon 
                          name={
                            notification.type === 'like' ? 'Heart' : 
                            notification.type === 'comment' ? 'MessageCircle' : 
                            notification.type === 'achievement' ? 'Award' : 'UserPlus'
                          } 
                          size={16} 
                          className="text-primary" 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.text}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" size={20} />
                  Безопасность аккаунта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Смена пароля</h4>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Текущий пароль" className="rounded-xl" />
                    <Input type="password" placeholder="Новый пароль" className="rounded-xl" />
                    <Input type="password" placeholder="Подтвердите новый пароль" className="rounded-xl" />
                    <Button className="rounded-xl">Обновить пароль</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-4">Двухфакторная аутентификация</h4>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div>
                      <p className="font-medium">Дополнительная защита аккаунта</p>
                      <p className="text-sm text-muted-foreground">Рекомендуется для повышения безопасности</p>
                    </div>
                    <Button variant="outline" className="rounded-xl">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Настроить 2FA
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-4">Активные сессии</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                      <div>
                        <p className="font-medium">Текущая сессия</p>
                        <p className="text-sm text-muted-foreground">Chrome • Москва • 192.168.1.1</p>
                      </div>
                      <Badge variant="secondary">Активна</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 rounded-xl">
                    Завершить все сессии
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Магазин очков</h2>
                <p className="text-muted-foreground">Приобретайте уникальные элементы за накопленные очки</p>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon name="Coins" size={24} className="text-yellow-500" />
                  <div>
                    <span className="font-bold text-xl">{currentPoints}</span>
                    <span className="text-muted-foreground ml-1">очков</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-all duration-300 border-0 shadow-sm group">
                  <CardHeader className="pb-3">
                    <div className={`aspect-square rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden ${
                      item.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-100 to-orange-100' :
                      item.rarity === 'epic' ? 'bg-gradient-to-br from-purple-100 to-pink-100' :
                      'bg-gradient-to-br from-blue-100 to-indigo-100'
                    }`}>
                      <Icon name="Package" size={48} className={
                        item.rarity === 'legendary' ? 'text-yellow-600' :
                        item.rarity === 'epic' ? 'text-purple-600' :
                        'text-blue-600'
                      } />
                      <div className="absolute top-2 right-2">
                        <Badge variant={item.rarity === 'legendary' ? 'default' : 'secondary'} 
                               className="text-xs capitalize">
                          {item.rarity === 'legendary' ? '⭐ Легендарный' : 
                           item.rarity === 'epic' ? '💎 Эпический' : '🔹 Редкий'}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit mb-2">{item.category}</Badge>
                    <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={18} className="text-yellow-500" />
                        <span className="font-bold text-lg">{item.price}</span>
                        <span className="text-sm text-muted-foreground">очков</span>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={currentPoints < item.price}
                        variant={currentPoints >= item.price ? "default" : "secondary"}
                        className="rounded-xl"
                      >
                        {currentPoints >= item.price ? (
                          <>
                            <Icon name="ShoppingCart" size={14} className="mr-1" />
                            Купить
                          </>
                        ) : 'Недостаточно'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Icon name="Info" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">Как получить больше очков?</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Создавайте билды, получайте лайки и комментарии, участвуйте в сообществе и выполняйте ежедневные задания
                </p>
                <Button variant="outline" className="rounded-xl">
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